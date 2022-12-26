import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { first, concatMap } from 'rxjs/operators';
import { WINDOW } from 'ngx-window-token';

import { PhotoStoreActions, PhotoStoreSelectors } from '@core/root-store';
import { Photo } from '@models';
import { PhotoGridSettingsFacade } from '@core/facades/settings/random-grid-settings-facade';

@Component({
    selector: 'app-photos-grid-view-toolbar',
    templateUrl: './grid-view-toolbar.component.html',
    styleUrls: ['./grid-view-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridViewToolbarComponent {
    @Input() isRandom = false;

    enableShare = false;
    activePhotoId$ = this.store.select(PhotoStoreSelectors.selectActivePhotoId);
    gridSettings$ = this.gridSettings.settings$;

    constructor(
        private store: Store,
        private gridSettings: PhotoGridSettingsFacade,
        @Inject(WINDOW) private window: Window
    ) {
        this.enableShare = !!window?.navigator?.share;
    }

    onToggleSlideshow(): void {
        this.store.dispatch(PhotoStoreActions.toggleSlideshowRequest());
    }

    onToggleCategoryBreadcrumbs(): void {
        this.gridSettings.toggleBreadcrumbs();
    }

    onToggleMargins(): void {
        this.gridSettings.toggleMargin();
    }

    onToggleSize(): void {
        this.gridSettings.toggleThumbnailSize();
    }

    onShare(): void {
        this.store
            .select(PhotoStoreSelectors.selectActivePhoto)
            .pipe(
                first(),
                concatMap(photo => this.sharePhoto(photo))
            )
            .subscribe({
                error: () => console.log('Error sharing photo'),
            });
    }

    private async sharePhoto(photo: Photo | null): Promise<void> {
        if (!!photo && !!this.window?.navigator?.share) {
            try {
                await navigator.share({ url: photo.imageMd.url });
            } catch {
                console.error('Error sharing');
            }
        } else {
            console.log('sharing is not enabled on this platform');
        }
    }
}
