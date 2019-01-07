import { Component, Input } from '@angular/core';

import { ICategory } from '../models/icategory.model';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
    @Input() category: ICategory;
}
