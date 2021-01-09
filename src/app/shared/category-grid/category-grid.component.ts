import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ThumbnailSize } from '@models/thumbnail-size.model';
import { CategoryTeaser } from '@models/category-teaser.model';

@Component({
    selector: 'app-shared-category-grid',
    templateUrl: './category-grid.component.html',
    styleUrls: ['./category-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryGridComponent {
    @Input() categories: CategoryTeaser[] | null = null;
    @Input() showTitles: boolean | null = null;
    @Input() showYears: boolean | null = null;
    @Input() thumbnailSize: ThumbnailSize | null = null;

    categoryTrackByFn(index: number, teaser: CategoryTeaser): string {
        return `${teaser.type}_${teaser.id}`;
    }
}
