import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { SettingsStoreSelectors } from '@core/root-store';
import { isValidPhotoViewMode, PhotoViewMode } from '@models';

@Injectable()
export class PhotosUrlService {
    constructor(
        private store: Store
    ) {

    }

    getValidView(requestedView: string | null, preferredView: string | null) {
        if (isValidPhotoViewMode(requestedView)) {
            return requestedView as string;
        }

        if (isValidPhotoViewMode(preferredView)) {
            return preferredView as string;
        }

        return PhotoViewMode.grid;
    }

    getDefaultView() {
        return this.store.select(SettingsStoreSelectors.photoViewMode)
            .pipe(
                // eslint-disable-next-line ngrx/avoid-mapping-selectors
                map(view => this.getValidView(null, view))
            );
    }
}
