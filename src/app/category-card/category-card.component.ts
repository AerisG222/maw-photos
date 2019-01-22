import { Component, Input } from '@angular/core';

import { Category } from '../models/category.model';

@Component({
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
    @Input() category: Category;
    @Input() showTitle: boolean;
    @Input() smallThumbnails: boolean;
}
