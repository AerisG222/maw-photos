import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { WINDOW } from 'ngx-window-token';

import { PhotoStoreActions, PhotoStoreSelectors } from '../../../core/root-store/photos-store';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';
import { DEFAULT_SETTINGS } from 'src/app/models/settings.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';
import { Photo } from 'src/app/models/photo.model';

@Component({
    selector: 'app-photos-grid-view-toolbar',
    templateUrl: './grid-view-toolbar.component.html',
    styleUrls: ['./grid-view-toolbar.component.scss']
})
export class GridViewToolbarComponent {
    enableShare = false;
    activePhotoId$ = this.store.select(PhotoStoreSelectors.activePhotoId);
    isFirst$ = this.store.select(PhotoStoreSelectors.isActivePhotoFirst);
    isLast$ = this.store.select(PhotoStoreSelectors.isActivePhotoLast);

    constructor(
        private store: Store,
        @Inject(WINDOW) private window: Window
    ) {
        this.enableShare = !!window?.navigator?.share;
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
        this.store.select(SettingsStoreSelectors.settings)
            .pipe(
                first()
            ).subscribe({
                next: settings => {
                    if (!!settings) {
                        const newMargin = CategoryMargin.nextSize(settings.photoGridMargin.name);

                        this.store.dispatch(SettingsStoreActions.updatePhotoGridMarginRequest({ newMargin }));
                    }
                },
                error: err => console.log(`error toggling margins: ${ err }`)
            });
    }

    onToggleSize(): void {
        this.store
            .select(SettingsStoreSelectors.settings)
            .pipe(
                first()
            ).subscribe({
                next: settings => {
                    const name = settings?.photoGridThumbnailSize.name ?? DEFAULT_SETTINGS.photoGridThumbnailSize.name;
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
