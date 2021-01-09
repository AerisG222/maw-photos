import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { filter, catchError, take } from 'rxjs/operators';

import { VideoCategoryStoreActions, VideoCategoryStoreSelectors } from '@core/root-store';
import { Category } from '@models';

@Injectable({
    providedIn: 'root'
})
export class VideoCategoriesResolverService implements Resolve<Category[]> {
    constructor(
        private store: Store
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> | Observable<never> {
        this.store.dispatch(VideoCategoryStoreActions.loadRequest());

        return this.store
            .select(VideoCategoryStoreSelectors.allCategories)
            .pipe(
                filter(cats => !!cats && cats.length > 0),
                take(1),
                catchError(e => EMPTY)
            );
    }
}
