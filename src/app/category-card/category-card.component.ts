import { Component, Input } from '@angular/core';

import { ICategory } from '../models/icategory.model';

@Component({
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
    @Input() category: ICategory;
    @Input() showTitle: boolean;
}
