import { Component, Input } from '@angular/core';

import { Category } from 'src/app/core/models/category.model';
import { CategoryType } from 'src/app/core/models/category-type.model';

@Component({
    selector: 'app-category-list2',
    templateUrl: './category-list2.component.html',
    styleUrls: ['./category-list2.component.scss']
})
export class CategoryList2Component {
    @Input() categories: Category[];

    categoryTypes = CategoryType;
}
