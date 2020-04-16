import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { CategoryTeaser } from 'src/app/models/category-teaser.model';

@Component({
    selector: 'app-shared-category-grid',
    templateUrl: './category-grid.component.html',
    styleUrls: ['./category-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryGridComponent {
    @Input() categories: CategoryTeaser[];
    @Input() showTitles: boolean;
    @Input() showYears: boolean;
    @Input() thumbnailSize: ThumbnailSize;

    categoryTrackByFn(index: number, teaser: CategoryTeaser) {
        return teaser.trackBy;
    }
}
