import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { isValidPhotoViewMode, PhotoViewMode } from '@models';
import { PhotoPageSettingsFacade } from '@core/facades/settings/photo-page-settings-facade';

@Injectable()
export class PhotosUrlService {
    constructor(private photoPage: PhotoPageSettingsFacade) { }

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
        return this.photoPage.settings$
            .pipe(
                map(s => this.getValidView(null, s.viewMode))
            );
    }
}
