import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isValidPhotoViewMode, RouteHelper } from '@models';
import { PhotosUrlService } from './photos-url.service';

@Injectable({
    providedIn: 'root',
})
export class ViewModeGuard implements CanActivate {
    constructor(private urlService: PhotosUrlService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const view = route.params?.view as string;

        // this should never happen based on where the guard is configured in the
        // router configuration
        if (isValidPhotoViewMode(view)) {
            return true;
        }

        return this.urlService
            .getPreferredView()
            .pipe(
                map((defaultView) =>
                    this.router.parseUrl(
                        RouteHelper.photoCategoriesAbs(
                            defaultView,
                            route.params.categoryId,
                            route.params.photoId
                        )
                    )
                )
            );
    }
}
