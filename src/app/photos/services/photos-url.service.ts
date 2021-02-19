import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isValidPhotoViewMode, PhotoViewMode } from '@models';
import { PhotoPageSettingsFacade } from '@core/facades/settings/photo-page-settings-facade';

@Injectable()
export class PhotosUrlService {
    constructor(private photoPage: PhotoPageSettingsFacade) {}

    getValidView(
        requestedView: string | null,
        preferredView: string | null
    ): string {
        if (isValidPhotoViewMode(requestedView)) {
            return requestedView as string;
        }

        if (isValidPhotoViewMode(preferredView)) {
            return preferredView as string;
        }

        return PhotoViewMode.grid;
    }

    getDefaultView(): Observable<string> {
        return this.photoPage.settings$.pipe(
            map((s) => this.getValidView(null, s.viewMode))
        );
    }
}
