import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
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
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const view = route.params?.view;

        // this should never happen based on where the guard is configured in the
        // router configuration
        if (isValidPhotoViewMode(view)) {
            return true;
        }

        return this.urlService
            .getDefaultView()
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
