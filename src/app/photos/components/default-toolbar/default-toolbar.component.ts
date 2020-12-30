import { Component, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { WINDOW } from 'ngx-window-token';

import { DEFAULT_SETTINGS } from 'src/app/models/settings.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/photos/store';
import {
    SettingsStoreActions,
    SettingsStoreSelectors,
    PhotoCategoryStoreSelectors,
    RootStoreSelectors
} from 'src/app/core/root-store';
import { Photo } from 'src/app/models/photo.model';

@Component({
    selector: 'app-photos-default-toolbar',
    templateUrl: './default-toolbar.component.html',
    styleUrls: ['./default-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultToolbarComponent {
    @Input() allowCategoryDownload: boolean | null = null;

    enableShare: boolean;

    isFirst$ = this.store.select(PhotoStoreSelectors.isActivePhotoFirst);
    isLast$ = this.store.select(PhotoStoreSelectors.isActivePhotoLast);
    enableBulkEdit$ = this.store.select(RootStoreSelectors.enableBulkEdit);
    enableMapView$ = this.store.select(PhotoStoreSelectors.enableMapView);
    smDownloadUrl$ = this.store.select(PhotoStoreSelectors.activePhotoSmDownloadUrl);
    mdDownloadUrl$ = this.store.select(PhotoStoreSelectors.activePhotoMdDownloadUrl);
    lgDownloadUrl$ = this.store.select(PhotoStoreSelectors.activePhotoLgDownloadUrl);
    prtDownloadUrl$ = this.store.select(PhotoStoreSelectors.activePhotoPrtDownloadUrl);
    category$ = this.store.select(PhotoCategoryStoreSelectors.activePhotoCategory);

    constructor(
        private store: Store,
        @Inject(WINDOW) private window: Window
    ) {
        this.enableShare = !!window?.navigator?.share;
    }

    onToggleCategoryBreadcrumbs(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoListCategoryBreadcrumbsRequest());
    }

    onTogglePhotoList(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoListShowPhotoListRequest());
    }

    onToggleSize(): void {
        this.store.select(SettingsStoreSelectors.settings)
            .pipe(
                first()
            ).subscribe({
                next: settings => {
                    const name = settings?.photoListThumbnailSize.name ?? DEFAULT_SETTINGS.photoListThumbnailSize.name;
                    const size = ThumbnailSize.nextSize(name);

                    this.store.dispatch(SettingsStoreActions.updatePhotoListThumbnailSizeRequest({ newSize: size }));
                },
                error: err => console.log(`error toggling size: ${ err }`)
            });
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

    onShare(): void {
        this.store.select(PhotoStoreSelectors.activePhoto)
            .pipe(
                first()
            ).subscribe({
                next: photo => this.sharePhoto(photo),
                error: err => console.log(`error trying to share photo ${ err }`)
            });
    }

    private async sharePhoto(photo: Photo | null): Promise<void> {
        if (!!photo && !!this.window?.navigator?.share) {
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
