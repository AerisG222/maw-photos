import { Injectable } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { RootStoreSelectors, SettingsStoreSelectors } from '@core/root-store';
import { RouteHelperService } from '@core/services';
import { CategoryTypeFilter, CategoryListType, toCategoryTypeFilter, RouteDetails } from '@models';

@Injectable()
export class CategoriesUrlService {
    categoriesBeforeNavigate$ = this.router.events.pipe(
        filter(evt => evt instanceof ResolveEnd),
        map(evt => (evt as ResolveEnd).state),
        filter(state => this.routeHelper.isCategoriesArea(state.url)),
        map(state => this.routeHelper.getRouteDetails(state))
    );

    constructor(
        private store: Store,
        private router: Router,
        private routeHelper: RouteHelperService
    ) {

    }

    static getValidYearFilter(requestedYearFilter: string | null, preferredYearFilter: string | number, allYears: number[]) {
        if(!!requestedYearFilter) {
            const result = CategoriesUrlService.isValidYearFilter(requestedYearFilter, allYears);

            if(result[0]) {
                return result[1];
            }
        }

        if(!!preferredYearFilter) {
            const result = CategoriesUrlService.isValidYearFilter(preferredYearFilter, allYears);

            if(result[0]) {
                return result[1];
            }
        }

        return allYears[0];
    }

    static getValidTypeFilter(requestedTypeFilter: string | null, preferredTypeFilter: string | null) {
        if(CategoriesUrlService.isValidTypeFilter(requestedTypeFilter)) {
            return requestedTypeFilter;
        }

        if(CategoriesUrlService.isValidTypeFilter(preferredTypeFilter)) {
            return preferredTypeFilter;
        }

        return CategoryTypeFilter.all;
    }

    private static isValidYearFilter(yearFilter: string | number, allYears: number[]): [boolean, string|number|null] {
        if(yearFilter === 'all') {
            return [true, yearFilter];
        }

        const year = Number(yearFilter);

        if(!isNaN(year) && allYears.indexOf(year) >= 0) {
            return [true, year];
        } else {
            return [false, null];
        }
    }

    private static isValidTypeFilter(typeFilter: string|null) {
        const validatedFilter = toCategoryTypeFilter(typeFilter);

        return !!validatedFilter;
    }

    updateYearFilterInUrl(yearFilter: string | number) {
        this.router.navigate(['.'], { queryParams: { year: yearFilter }, queryParamsHandling: 'merge' });
    }

    updateCategoryTypeFilterInUrl(typeFilter: CategoryTypeFilter) {
        this.router.navigate(['.'], { queryParams: { type: typeFilter }, queryParamsHandling: 'merge' });
    }

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
                // eslint-disable-next-line max-len
                const yearFilter = CategoriesUrlService.getValidYearFilter(routeDetails.queryParams?.year, preferredYearFilter, allYears)?.toString();
                const typeFilter = CategoriesUrlService.getValidTypeFilter(routeDetails.queryParams?.type, preferredTypeFilter);

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
}
