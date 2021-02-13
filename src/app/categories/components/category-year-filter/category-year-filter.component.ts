import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-categories-category-year-filter',
    templateUrl: './category-year-filter.component.html',
    styleUrls: ['./category-year-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryYearFilterComponent {
    @Input() yearFilter: string|number = '';
    @Input() allYears: number[] = [];
    @Output() filterChange = new EventEmitter<number | string>();

    onSelectYear(change: MatSelectChange): void {
        this.filterChange.next(change.value);
    }
}
