import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { CategoryType } from 'src/app/core/models/category-type.model';
import { CategoryTeaser } from 'src/app/core/models/category-teaser.model';

@Component({
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent {
    @Input() category: CategoryTeaser;
    @Input() showTitle: boolean;
    @Input() showYear: boolean;
    @Input() thumbnailSize: ThumbnailSize;

    categoryTypes = CategoryType;
}
