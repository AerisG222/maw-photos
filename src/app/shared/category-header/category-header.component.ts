import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Category } from 'src/app/models/category.model';

@Component({
    selector: 'app-shared-category-header',
    templateUrl: './category-header.component.html',
    styleUrls: ['./category-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryHeaderComponent {
    @Input() category?: Category;
    @Input() showCategoryAsLink?: boolean;
}
