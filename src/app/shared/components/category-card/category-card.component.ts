import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { CategoryTeaser, CategoryType, ThumbnailSize } from '@models';

@Component({
    selector: 'app-shared-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent {
    @Input() category: CategoryTeaser | null = null;
    @Input() showTitle: boolean | null = null;
    @Input() showYear: boolean | null = null;
    @Input() thumbnailSize: ThumbnailSize | null = null;

    categoryTypes = CategoryType;
}
