import { Component, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { WINDOW } from 'ngx-window-token';

import { DEFAULT_SETTINGS } from '@models/settings.model';
import { ThumbnailSize } from '@models/thumbnail-size.model';
import { PhotoStoreSelectors } from '@core/root-store/photos-store';
import {
    SettingsStoreActions,
    SettingsStoreSelectors,
    PhotoCategoryStoreSelectors,
    RootStoreSelectors
} from 'src/app/core/root-store';
import { Photo } from '@models/photo.model';

@Component({
    selector: 'app-photos-detail-toolbar',
    templateUrl: './detail-toolbar.component.html',
    styleUrls: ['./detail-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailToolbarComponent {
    @Input() allowCategoryDownload: boolean | null = null;

    enableShare: boolean;

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
