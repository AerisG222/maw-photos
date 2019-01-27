import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Category } from '../../core/models/category.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Component({
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent {
    @Input() category: Category;
    @Input() showTitle: boolean;
    @Input() thumbnailSize: ThumbnailSize;
}
