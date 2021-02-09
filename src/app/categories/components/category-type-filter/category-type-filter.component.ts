import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { allCategoryTypeFilters, CategoryTypeFilter, toCategoryTypeFilter } from '@models';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-categories-category-type-filter',
    templateUrl: './category-type-filter.component.html',
    styleUrls: ['./category-type-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTypeFilterComponent {
    @Input() typeFilter = CategoryTypeFilter.all;
    @Output() filterChange = new EventEmitter<CategoryTypeFilter>();

    categoryTypes = allCategoryTypeFilters;

    onSelectCategoryType(change: MatSelectChange): void {
        const filter = toCategoryTypeFilter(change.value) as CategoryTypeFilter;

        this.filterChange.next(filter);
    }
}
