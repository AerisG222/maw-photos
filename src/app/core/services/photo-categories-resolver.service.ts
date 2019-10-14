import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { filter, catchError, take } from 'rxjs/operators';

import { PhotoCategory } from '../models/photo-category.model';
import { RootStoreState, PhotoCategoryStoreActions, PhotoCategoryStoreSelectors } from '../root-store';

@Injectable({
    providedIn: 'root'
})
export class PhotoCategoriesResolverService implements Resolve<PhotoCategory[]> {
    constructor(
        private store$: Store<RootStoreState.State>
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PhotoCategory[]> | Observable<never> {
        this.store$.dispatch(PhotoCategoryStoreActions.loadRequest());

        return this.store$.pipe(
            select(PhotoCategoryStoreSelectors.selectAllCategories),
            filter(cats => !!cats && cats.length > 0),
            take(1),
            catchError(e => EMPTY)
        );
    }
}
