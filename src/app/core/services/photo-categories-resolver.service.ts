import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { filter, catchError, take } from 'rxjs/operators';

import { PhotoCategoryStoreActions, PhotoCategoryStoreSelectors } from 'src/app/core/root-store';
import { Category } from 'src/app/models/category.model';

@Injectable({
    providedIn: 'root'
})
export class PhotoCategoriesResolverService implements Resolve<Category[]> {
    constructor(
        private store$: Store
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> | Observable<never> {
        this.store$.dispatch(PhotoCategoryStoreActions.loadRequest());

        return this.store$.pipe(
            select(PhotoCategoryStoreSelectors.selectAllCategories),
            filter(cats => !!cats && cats.length > 0),
            take(1),
            catchError(e => EMPTY)
        );
    }
}
