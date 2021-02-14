import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RootStoreSelectors } from '@core/root-store';
import { CategoryFilterSettings } from '@models';
import { CategoryTypeFilter, toCategoryTypeFilter, RouteDetails } from '@models';
import { CategoryFilterSettingsFacade } from '@core/facades/settings/category-filter-settings-facade';

@Injectable()
export class CategoriesUrlService {
    constructor(
        private store: Store,
        private router: Router,
        private categoryFilterFacade: CategoryFilterSettingsFacade
    ) {

    }

    static getValidYearFilter(requestedYearFilter: string | null, preferredYearFilter: string | number, allYears: number[]): string|number {
        if(!!requestedYearFilter) {
            const result = CategoriesUrlService.isValidYearFilter(requestedYearFilter, allYears);

            if(result[0]) {
                return result[1] as string|number;
            }
        }

        if(!!preferredYearFilter) {
            const result = CategoriesUrlService.isValidYearFilter(preferredYearFilter, allYears);

            if(result[0]) {
                return result[1] as string|number;
            }
        }

        return allYears[0];
    }

    static getValidTypeFilter(requestedTypeFilter: string | null, preferredTypeFilter: string | null): string {
        if(CategoriesUrlService.isValidTypeFilter(requestedTypeFilter)) {
            return requestedTypeFilter as string;
        }

        if(CategoriesUrlService.isValidTypeFilter(preferredTypeFilter)) {
            return preferredTypeFilter as string;
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

        this.addFilterToUrl(filterParams);
    }

    ensureCompleteUrl(routeDetails: RouteDetails): Observable<boolean> {
        return combineLatest([
            this.store.select(RootStoreSelectors.allYears),
            this.categoryFilterFacade.settings$
        ]).pipe(
            tap(([allYears, filter]) => {
                if(allYears.length === 0) {
                    return;
                }

                if(!!routeDetails.queryParams?.year && !!routeDetails.queryParams.type) {
                    return;
                }

                this.addFilterToUrl({
                    year: CategoriesUrlService.getValidYearFilter(routeDetails.queryParams?.year, filter.yearFilter, allYears),
                    type: CategoriesUrlService.getValidTypeFilter(routeDetails.queryParams?.type, filter.typeFilter)
                });
            }),
            map(x => true)
        );
    }

    private addFilterToUrl(filterParams: { type: string; year: string | number }) {
        this.router.navigate([], {
            relativeTo: this.router.routerState.root,
            queryParams: filterParams,
            queryParamsHandling: 'merge'
        });
    }
}
