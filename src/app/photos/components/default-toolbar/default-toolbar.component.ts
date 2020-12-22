import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, filter, map, first } from 'rxjs/operators';
import { WINDOW } from 'ngx-window-token';

import { Settings, DEFAULT_SETTINGS } from 'src/app/models/settings.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/photos/store';
import {
    SettingsStoreActions,
    SettingsStoreSelectors,
    PhotoCategoryStoreSelectors,
    RootStoreSelectors
} from 'src/app/core/root-store';
import { PhotoCategory } from 'src/app/models/photo-category.model';
import { Category } from 'src/app/models/category.model';
import { Photo } from 'src/app/models/photo.model';

@Component({
    selector: 'app-photos-default-toolbar',
    templateUrl: './default-toolbar.component.html',
    styleUrls: ['./default-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultToolbarComponent implements OnInit, OnDestroy {
    @Input() allowCategoryDownload: boolean | null = null;

    enableShare: boolean;

    isFirst$: Observable<boolean> | null = null;
    isLast$: Observable<boolean> | null = null;
    enableBulkEdit$: Observable<boolean> | null = null;
    enableMapView$: Observable<boolean> | null = null;
    category$: Observable<PhotoCategory> | null = null;
    settings: Settings | null = null;

    smDownloadUrl: string | null = null;
    mdDownloadUrl: string | null = null;
    lgDownloadUrl: string | null = null;
    prtDownloadUrl: string | null = null;

    private destroySub = new Subscription();

    constructor(
        private store: Store,
        @Inject(WINDOW) private window: Window
    ) {
        this.enableShare = !!window?.navigator?.share;
    }

    ngOnInit(): void {
        this.destroySub.add(this.store
            .select(SettingsStoreSelectors.selectSettings)
            .pipe(
                tap(settings => this.settings = settings)
            ).subscribe()
        );

        this.category$ = this.store
            .select(PhotoCategoryStoreSelectors.selectActiveCategory)
            .pipe(
                filter(c => !!c),
                map(c => (c as Category).actual as PhotoCategory)
            );

        this.enableBulkEdit$ = this.store.select(RootStoreSelectors.selectEnableBulkEdit);
        this.enableMapView$ = this.store.select(PhotoStoreSelectors.selectEnableMapView);
        this.isFirst$ = this.store.select(PhotoStoreSelectors.selectIsActivePhotoFirst);
        this.isLast$ = this.store.select(PhotoStoreSelectors.selectIsActivePhotoLast);

        this.destroySub.add(this.store
            .select(PhotoStoreSelectors.selectActivePhoto)
            .pipe(
                filter(x => !!x),
                map(x => x as Photo),
                tap(photo => this.smDownloadUrl = photo.imageSm.downloadUrl),
                tap(photo => this.mdDownloadUrl = photo.imageMd.downloadUrl),
                tap(photo => this.lgDownloadUrl = photo.imageLg.downloadUrl),
                tap(photo => this.prtDownloadUrl = photo.imagePrt.downloadUrl)
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onToggleCategoryBreadcrumbs(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoListCategoryBreadcrumbsRequest());
    }

    onTogglePhotoList(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoListShowPhotoListRequest());
    }

    onToggleSize(): void {
        const name = this.settings?.photoListThumbnailSize.name ?? DEFAULT_SETTINGS.photoListThumbnailSize.name;
        const size = ThumbnailSize.nextSize(name);

        this.store.dispatch(SettingsStoreActions.updatePhotoListThumbnailSizeRequest({ newSize: size }));
    }

    onToggleFullscreen(): void {
        this.store.dispatch(PhotoStoreActions.enterFullscreenRequest());
    }

    onToggleMapView(): void {
        this.store.dispatch(PhotoStoreActions.toggleMapViewRequest());
    }

    onToggleBulkEditView(): void {
        this.store.dispatch(PhotoStoreActions.toggleBulkEditViewRequest());
    }

    onToggleGridView(): void {
        this.store.dispatch(PhotoStoreActions.toggleGridViewRequest());
    }

    onMoveNext(): void {
        this.store.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onMovePrevious(): void {
        this.store.dispatch(PhotoStoreActions.movePreviousRequest());
    }

    onToggleSlideshow(): void {
        this.store.dispatch(PhotoStoreActions.toggleSlideshowRequest());
    }

    onShare(): void {
        this.store
            .select(PhotoStoreSelectors.selectActivePhoto)
            .pipe(
                first(),
                filter(x => !!x),
                map(x => x as Photo),
                tap(x => this.sharePhoto(x))
            ).subscribe();
    }

    private async sharePhoto(photo: Photo): Promise<void> {
        if (!!this.window?.navigator?.share) {
            try {
                await navigator.share({ url: photo.imageMd.url });
            } catch (error) {
                console.error('Error sharing: ' + error);
            }
        } else {
            console.log('sharing is not enabled on this platform');
        }
    }
}
