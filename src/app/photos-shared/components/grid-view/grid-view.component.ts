 import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreSelectors, PhotoCategoryStoreSelectors, RouterStoreSelectors } from '@core/root-store';
import { PhotoStoreSelectors } from '../../../core/root-store/photos-store';
import { ToolbarComponent } from 'src/app/layout/toolbar/toolbar.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-photos-grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridViewComponent implements OnDestroy {
    @ViewChild(ToolbarComponent) layout: ToolbarComponent | null = null;

    lastScrollTop = 0;
    category$ = this.store.select(PhotoCategoryStoreSelectors.activeCategory);
    settings$ = this.store.select(SettingsStoreSelectors.settings);
    photos$ = this.store.select(PhotoStoreSelectors.allPhotos);
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    thumbnailSize$ = this.store.select(SettingsStoreSelectors.photoGridThumbnailSize);
    margin$ = this.store.select(SettingsStoreSelectors.photoGridMargin);
    showBreadcrumbs$ = this.store.select(SettingsStoreSelectors.photoGridShowCategoryBreadcrumbs);
    showCategoryAsLink$ = this.store.select(RouterStoreSelectors.isRandomView);

    private destroySub = new Subscription();

    constructor(
        private store: Store
    ) {
        this.destroySub.add(this.store.select(RouterStoreSelectors.selectRouteDetails)
            .subscribe({
                next: details => {
                    // main grid view does not require a photo id, so when it is not present, move to last scroll position
                    if(!!!details.data.requirePhotoId) {
                        this.returnToScrollPosition();
                    }
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    trackScrollPosition(): void {
        if (!!this.layout) {
            this.lastScrollTop = this.layout.getCurrentScrollTop();
        }
    }

    returnToScrollPosition(): void {
        if (!!this.layout && this.layout.getCurrentScrollTop() !== this.lastScrollTop) {
            this.layout.setCurrentScrollTop(this.lastScrollTop);
        }
    }
}
