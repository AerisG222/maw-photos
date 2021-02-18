import { Component, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { WINDOW } from 'ngx-window-token';

import { Photo } from '@models';
import { PhotoCategoryStoreSelectors, PhotoStoreSelectors } from '@core/root-store';
import { PhotoDetailSettingsFacade } from '@core/facades/settings/photo-detail-settings-facade';

@Component({
    selector: 'app-photos-detail-toolbar',
    templateUrl: './detail-toolbar.component.html',
    styleUrls: ['./detail-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailToolbarComponent {
    @Input() allowCategoryDownload: boolean | null = null;

    enableShare: boolean;

    smDownloadUrl$ = this.store.select(PhotoStoreSelectors.activePhotoSmDownloadUrl);
    mdDownloadUrl$ = this.store.select(PhotoStoreSelectors.activePhotoMdDownloadUrl);
    lgDownloadUrl$ = this.store.select(PhotoStoreSelectors.activePhotoLgDownloadUrl);
    prtDownloadUrl$ = this.store.select(PhotoStoreSelectors.activePhotoPrtDownloadUrl);
    category$ = this.store.select(PhotoCategoryStoreSelectors.activePhotoCategory);

    constructor(
        private store: Store,
        private detailSettings: PhotoDetailSettingsFacade,
        @Inject(WINDOW) private window: Window
    ) {
        this.enableShare = !!window?.navigator?.share;
    }

    onToggleCategoryBreadcrumbs(): void {
        this.detailSettings.toggleBreadcrumbs();
    }

    onTogglePhotoList(): void {
        this.detailSettings.togglePhotoList();
    }

    onToggleSize(): void {
        this.detailSettings.toggleThumbnailSize();
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
                console.error(`Error sharing: ${error}`);
            }
        } else {
            console.log('sharing is not enabled on this platform');
        }
    }
}
