import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { WINDOW } from 'ngx-window-token';

import { PhotoStoreActions, PhotoStoreSelectors, SettingsStoreSelectors, SettingsStoreActions } from '@core/root-store';
import {
    DEFAULT_SETTINGS,
    ThumbnailSize,
    CategoryMargin,
    Photo,
 } from '@models';

@Component({
    selector: 'app-photos-grid-view-toolbar',
    templateUrl: './grid-view-toolbar.component.html',
    styleUrls: ['./grid-view-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridViewToolbarComponent {
    enableShare = false;
    activePhotoId$ = this.store.select(PhotoStoreSelectors.activePhotoId);

    constructor(
        private store: Store,
        @Inject(WINDOW) private window: Window
    ) {
        this.enableShare = !!window?.navigator?.share;
    }

    onToggleSlideshow(): void {
        this.store.dispatch(PhotoStoreActions.toggleSlideshowRequest());
    }

    onToggleCategoryBreadcrumbs(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoGridShowCategoryBreadcrumbsRequest());
    }

    onToggleMargins(): void {
        this.store.select(SettingsStoreSelectors.photoGridMargin)
            .pipe(
                first()
            ).subscribe({
                next: margin => {
                    if (!!margin) {
                        const newMargin = CategoryMargin.nextSize(margin.name);

                        this.store.dispatch(SettingsStoreActions.updatePhotoGridMarginRequest({ newMargin }));
                    }
                },
                error: err => console.log(`error toggling margins: ${ err }`)
            });
    }

    onToggleSize(): void {
        this.store
            .select(SettingsStoreSelectors.photoGridThumbnailSize)
            .pipe(
                first()
            ).subscribe({
                next: thumbnailSize => {
                    const name = thumbnailSize?.name ?? DEFAULT_SETTINGS.photoGridThumbnailSize.name;
                    const size = ThumbnailSize.nextSize(name);

                    this.store.dispatch(SettingsStoreActions.updatePhotoGridThumbnailSizeRequest({ newSize: size }));
                },
                error: err => console.log(`error toggling size: ${ err }`)
            });
    }

    onShare(): void {
        this.store.select(PhotoStoreSelectors.activePhoto)
            .pipe(
                first()
            )
            .subscribe({
                next: photo => this.sharePhoto(photo),
                error: err => console.log(`error sharing photo: ${ err }`)
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
