import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Category } from '../../core/models/category.model';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent {
    @Input() categories: Category[];
    @Input() showTitles: boolean;
    @Input() smallThumbnails: boolean;
}
