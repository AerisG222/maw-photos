import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { filter, catchError, take } from 'rxjs/operators';

import { VideoCategoryStoreActions, VideoCategoryStoreSelectors } from '../root-store';
import { VideoCategory } from '../models/video-category.model';

@Injectable({
    providedIn: 'root'
})
export class VideoCategoriesResolverService implements Resolve<VideoCategory[]> {
    constructor(
        private store$: Store<{}>
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VideoCategory[]> | Observable<never> {
        this.store$.dispatch(VideoCategoryStoreActions.loadRequest());

        return this.store$.pipe(
            select(VideoCategoryStoreSelectors.selectAllCategories),
            filter(cats => !!cats && cats.length > 0),
            take(1),
            catchError(e => EMPTY)
        );
    }
}
