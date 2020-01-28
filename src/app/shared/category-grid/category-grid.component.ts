import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { CategoryTeaser } from 'src/app/core/models/category-teaser.model';

@Component({
    selector: 'app-category-grid',
    templateUrl: './category-grid.component.html',
    styleUrls: ['./category-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryGridComponent {
    @Input() categories: CategoryTeaser[];
    @Input() showTitles: boolean;
    @Input() showYears: boolean;
    @Input() thumbnailSize: ThumbnailSize;
}
