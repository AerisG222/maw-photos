import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Component({
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent {
    @Input() category: PhotoCategory;
    @Input() showTitle: boolean;
    @Input() thumbnailSize: ThumbnailSize;
}
