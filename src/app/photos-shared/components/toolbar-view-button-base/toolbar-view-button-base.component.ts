import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {
    PhotoViewMode,
    PhotoViewModeSelectable,
    RouteArea,
    RouteHelper,
} from '@models';
import { RouterStoreSelectors } from '@core/root-store';
import { getNumber } from 'src/app/models/helpers/number';

export abstract class ToolbarViewButtonBaseComponent {
    url$ = this.store.select(RouterStoreSelectors.selectRouteDetails).pipe(
        // eslint-disable-next-line ngrx/avoid-mapping-selectors
        map((details) => {
            const photoId = this.includePhotoIdInUrl ? getNumber(details.params?.photoId) : undefined;

            if (details.area === RouteArea.photos) {
                return [
                    RouteHelper.photoCategoriesAbs(
                        this.viewMode,
                        details.params?.categoryId,
                        photoId
                    ),
                ];
            } else {
                return [
                    RouteHelper.randomAbs(
                        this.viewMode,
                        photoId
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
        private viewMode: PhotoViewMode,
        private includePhotoIdInUrl: boolean
    ) {}
}
