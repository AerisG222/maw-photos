import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RootStoreSelectors, SettingsStoreSelectors } from '@core/root-store';
import { RouteHelperService } from '@core/services';
import { CategoryTypeFilter, CategoryListType, toCategoryTypeFilter, RouteDetails } from '@models';

@Injectable()
export class CategoriesUrlService {
    constructor(
        private store: Store,
        private router: Router
    ) { }

    ensureCompleteUrl(routeDetails: RouteDetails): Observable<boolean> {
        return combineLatest([
            this.store.select(RootStoreSelectors.allYears),
            this.store.select(SettingsStoreSelectors.categoryListListType),
            this.store.select(SettingsStoreSelectors.categoryListYearFilter),
            this.store.select(SettingsStoreSelectors.categoryListCategoryFilter)
        ]).pipe(
            tap(([allYears, preferredView, preferredYearFilter, preferredTypeFilter]) => {
                if(allYears.length === 0) {
                    return;
                }

                // TODO: fix more enums and clean the line below
                const view = this.getValidView(routeDetails.params?.vew, preferredView.toString());
                const yearFilter = this.getValidYearFilter(routeDetails.queryParams?.year, preferredYearFilter, allYears);
                const typeFilter = this.getValidTypeFilter(routeDetails.queryParams?.type, preferredTypeFilter);

                if(
                    view !== routeDetails.params?.view ||
                    yearFilter !== routeDetails.queryParams?.year ||
                    typeFilter !== routeDetails.queryParams?.type
                ) {
                    const url = `/${ RouteHelperService.categories }/${ view }?year=${ yearFilter }&type=${ typeFilter }`;

                    this.router.navigateByUrl(url);
                }
            }),
            map(x => true)
        );
    }

    private getValidView(requestedView: string | null, preferredView: string | null)
    {
        if(!!requestedView && this.isValidView(requestedView)) {
            return requestedView;
        }

        if(!!preferredView && this.isValidView(preferredView)) {
            return preferredView;
        }

        return CategoryListType.grid.name.toLowerCase();
    }

    private isValidView(viewName: string) {
        return viewName === CategoryListType.grid.name.toLowerCase() ||
            viewName === CategoryListType.list.name.toLowerCase();
    }

    private getValidYearFilter(requestedYearFilter: string | null, preferredYearFilter: string | number, allYears: number[]) {
        if(!!requestedYearFilter && this.isValidYearFilter(requestedYearFilter, allYears)) {
            return requestedYearFilter;
        }

        if(!!preferredYearFilter && this.isValidYearFilter(preferredYearFilter, allYears)) {
            return preferredYearFilter;
        }

        return allYears[0];
    }

    private isValidYearFilter(yearFilter: string | number, allYears: number[]) {
        if(yearFilter === 'all') {
            return yearFilter;
        }

        const year = Number(yearFilter);

        return !isNaN(year) &&
            allYears.indexOf(year) >= 0;
    }

    private getValidTypeFilter(requestedTypeFilter: string | null, preferredTypeFilter: string | null) {
        if(this.isValidTypeFilter(requestedTypeFilter)) {
            return requestedTypeFilter;
        }

        if(this.isValidTypeFilter(preferredTypeFilter)) {
            return preferredTypeFilter;
        }

        return CategoryTypeFilter.all;
    }

    private isValidTypeFilter(filter: string|null) {
        const validatedFilter = toCategoryTypeFilter(filter);

        return !!validatedFilter;
    }
}
