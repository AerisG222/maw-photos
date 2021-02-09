import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-categories-category-missing-gps-filter',
    templateUrl: './category-missing-gps-filter.component.html',
    styleUrls: ['./category-missing-gps-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryMissingGpsFilterComponent {
    @Input() filterEnabled = false;
    @Output() filterChange = new EventEmitter<boolean>();

    onToggleMissingGpsData(evt: MatSlideToggleChange): void {
        this.filterChange.next(evt.checked);
    }
}
