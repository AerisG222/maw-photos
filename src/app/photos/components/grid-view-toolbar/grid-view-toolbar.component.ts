import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, first, filter, map } from 'rxjs/operators';
import { WINDOW } from 'ngx-window-token';

import { PhotoStoreActions, PhotoStoreSelectors } from '../../store';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';
import { Settings, DEFAULT_SETTINGS } from 'src/app/models/settings.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';
import { Photo } from 'src/app/models/photo.model';

@Component({
    selector: 'app-photos-grid-view-toolbar',
    templateUrl: './grid-view-toolbar.component.html',
    styleUrls: ['./grid-view-toolbar.component.scss']
})
export class GridViewToolbarComponent implements OnInit, OnDestroy {
    enableShare = false;
    isPhotoSelected = false;
    settings: Settings | null = null;
    isFirst$: Observable<boolean> | null = null;
    isLast$: Observable<boolean> | null = null;

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

        this.destroySub.add(this.store
            .select(PhotoStoreSelectors.selectActivePhoto)
            .pipe(
                map(x => this.isPhotoSelected = !!x)
            ).subscribe()
        );

        this.isFirst$ = this.store.select(PhotoStoreSelectors.selectIsActivePhotoFirst);
        this.isLast$ = this.store.select(PhotoStoreSelectors.selectIsActivePhotoLast);
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onExitGridView(): void {
        this.store.dispatch(PhotoStoreActions.exitGridViewRequest());
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

    onToggleCategoryBreadcrumbs(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoGridShowCategoryBreadcrumbsRequest());
    }

    onToggleMargins(): void {
        if (this.settings) {
            const newMargin = CategoryMargin.nextSize(this.settings.photoGridMargin.name);

            this.store.dispatch(SettingsStoreActions.updatePhotoGridMarginRequest({ newMargin }));
        }
    }

    onToggleSize(): void {
        const name = this.settings?.photoGridThumbnailSize.name ?? DEFAULT_SETTINGS.photoGridThumbnailSize.name;
        const size = ThumbnailSize.nextSize(name);

        this.store.dispatch(SettingsStoreActions.updatePhotoGridThumbnailSizeRequest({ newSize: size }));
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
