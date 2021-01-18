import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RootStoreSelectors, SettingsStoreSelectors } from '@core/root-store';
import { RouteHelperService } from '@core/services';
import { CategoryFilter, CategoryListType } from '@models';

@Injectable()
export class UrlGuardGuard implements CanActivate {
    constructor(
        private store: Store,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return combineLatest([
            this.store.select(RootStoreSelectors.allYears),
            this.store.select(SettingsStoreSelectors.categoryListListType),
            this.store.select(SettingsStoreSelectors.categoryListYearFilter),
            this.store.select(SettingsStoreSelectors.categoryListCategoryFilter)
        ]).pipe(
            map(([allYears, preferredView, preferredYearFilter, preferredTypeFilter]) => {
                const view = this.getValidView(route.params?.vew, preferredView?.name);
                const yearFilter = this.getValidYearFilter(route.params?.year, preferredYearFilter, allYears);
                const typeFilter = this.getValidTypeFilter(route.params?.type, preferredTypeFilter.name);

                if(
                    view === route.params?.view &&
                    yearFilter === route.params?.year &&
                    typeFilter === route.params?.type
                ) {
                    return true;
                } else {
                    const url = `/${ RouteHelperService.categories }/${ view }?year=${ yearFilter }&type=${ typeFilter }`;

                    return this.router.parseUrl(url);
                }
            })
        );
    }

    getValidView(requestedView: string | null, preferredView: string | null)
    {
        if(!!requestedView && this.isValidView(requestedView)) {
            return requestedView;
        }

        if(!!preferredView && this.isValidView(preferredView)) {
            return preferredView;
        }

        return CategoryListType.grid.name.toLowerCase();
    }

    isValidView(viewName: string) {
        return viewName === CategoryListType.grid.name.toLowerCase() ||
            viewName === CategoryListType.list.name.toLowerCase();
    }

    getValidYearFilter(requestedYearFilter: string | null, preferredYearFilter: string | number, allYears: number[]) {
        if(!!requestedYearFilter && this.isValidYearFilter(requestedYearFilter, allYears)) {
            return requestedYearFilter;
        }

        if(!!preferredYearFilter && this.isValidYearFilter(preferredYearFilter, allYears)) {
            return preferredYearFilter;
        }

        return allYears[0];
    }

    isValidYearFilter(yearFilter: string | number, allYears: number[]) {
        if(yearFilter === 'all') {
            return yearFilter;
        }

        const year = Number(yearFilter);

        return !isNaN(year) &&
            allYears.indexOf(year) >= 0;
    }

    getValidTypeFilter(requestedTypeFilter: string | null, preferredTypeFilter: string | null) {
        if(!!requestedTypeFilter && this.isValidTypeFilter(requestedTypeFilter)) {
            return requestedTypeFilter;
        }

        if(!!preferredTypeFilter && this.isValidTypeFilter(preferredTypeFilter)) {
            return preferredTypeFilter;
        }

        return CategoryFilter.all;
    }

    isValidTypeFilter(filter: string) {
        return filter === CategoryFilter.all.name ||
            filter === CategoryFilter.photos.name ||
            filter === CategoryFilter.videos.name;
    }
}
