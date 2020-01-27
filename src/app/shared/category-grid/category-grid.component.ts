import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Category } from 'src/app/core/models/category.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Component({
    selector: 'app-category-grid',
    templateUrl: './category-grid.component.html',
    styleUrls: ['./category-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryGridComponent {
    @Input() categories: Category[];
    @Input() showTitles: boolean;
    @Input() thumbnailSize: ThumbnailSize;
}
