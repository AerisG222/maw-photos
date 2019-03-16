import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { filter, catchError, take } from 'rxjs/operators';

import { RootStoreState, VideoCategoryStoreActions, VideoCategoryStoreSelectors } from '../root-store';
import { VideoCategory } from '../models/video-category.model';

@Injectable({
    providedIn: 'root'
})
export class VideoCategoriesResolverService implements Resolve<VideoCategory[]> {
    constructor(
        private _store$: Store<RootStoreState.State>
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VideoCategory[]> | Observable<never> {
        this._store$.dispatch(new VideoCategoryStoreActions.LoadRequestAction());

        return this._store$.pipe(
            select(VideoCategoryStoreSelectors.selectAllCategories),
            filter(cats => !!cats && cats.length > 0),
            take(1),
            catchError(e => EMPTY)
        );
    }
}
