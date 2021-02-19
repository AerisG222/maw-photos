import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { PhotoViewModeSelectable } from '@core/facades/photo-view-mode-selectable';
import { PhotoViewMode, RouteArea, RouteHelper } from '@models';
import { Store } from '@ngrx/store';
import { RouterStoreSelectors } from '@core/root-store';

@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class ToolbarViewButtonBaseComponent {
    url$ = this.store.select(RouterStoreSelectors.selectRouteDetails).pipe(
        // eslint-disable-next-line ngrx/avoid-mapping-selectors
        map((details) => {
            if (details.area === RouteArea.photos) {
                return [
                    RouteHelper.photoCategoriesAbs(
                        this.viewMode,
                        details.params?.categoryId,
                        details.params?.photoId
                    ),
                ];
            } else {
                return [
                    RouteHelper.randomAbs(
                        this.viewMode,
                        details.params?.photoId
                    ),
                ];
            }
        })
    );

    isActive$ = this.viewModeSelectable.activePhotoViewMode$.pipe(
        map((activeView) => activeView === this.viewMode)
    );

    constructor(
        public viewModeSelectable: PhotoViewModeSelectable,
        public store: Store,
        private viewMode: PhotoViewMode
    ) {}

    onSelectView(): void {
        this.viewModeSelectable.selectPhotoViewMode(this.viewMode);
    }
}
