import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';

@Component({
    selector: 'app-category-header',
    templateUrl: './category-header.component.html',
    styleUrls: ['./category-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryHeaderComponent {
    @Input() category: PhotoCategory;
    @Input() showCategoryAsLink: boolean;
}
