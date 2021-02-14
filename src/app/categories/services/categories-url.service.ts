import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RootStoreSelectors } from '@core/root-store';
import { CategoryFilterSettings, RouteHelper } from '@models';
import { CategoryTypeFilter, toCategoryTypeFilter, RouteDetails } from '@models';
import { CategoryPageSettingsFacade } from '@core/facades/settings/category-page-settings-facade';
import { CategoryFilterSettingsFacade } from '@core/facades/settings/category-filter-settings-facade';

@Injectable()
export class CategoriesUrlService {
    constructor(
        private store: Store,
        private router: Router,
        private categoryPageFacade: CategoryPageSettingsFacade,
        private categoryFilterFacade: CategoryFilterSettingsFacade
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

    updateFilterInUrl(settings: CategoryFilterSettings) {
        const filterParams = {
            year: settings.yearFilter,
            type: settings.typeFilter
        };

        this.router.navigate([], {
            relativeTo: this.router.routerState.root,
            queryParams: filterParams,
            queryParamsHandling: 'merge'
        });
    }

    ensureCompleteUrl(routeDetails: RouteDetails): Observable<boolean> {
        return combineLatest([
            this.store.select(RootStoreSelectors.allYears),
            this.categoryPageFacade.settings$,
            this.categoryFilterFacade.settings$
        ]).pipe(
            tap(([allYears, page, filter]) => {
                if(allYears.length === 0) {
                    return;
                }

                if(!!routeDetails.queryParams?.year && !!routeDetails.queryParams.type) {
                    return;
                }

                // eslint-disable-next-line max-len
                const yearFilter = CategoriesUrlService.getValidYearFilter(routeDetails.queryParams?.year, filter.yearFilter, allYears)?.toString();
                const typeFilter = CategoriesUrlService.getValidTypeFilter(routeDetails.queryParams?.type, filter.typeFilter);

                if(
                    yearFilter !== routeDetails.queryParams?.year ||
                    typeFilter !== routeDetails.queryParams?.type
                ) {
                    const url = `/${ RouteHelper.categories }/${ page.viewMode }?year=${ yearFilter }&type=${ typeFilter }`;

                    this.router.navigateByUrl(url);
                }
            }),
            map(x => true)
        );
    }
}
