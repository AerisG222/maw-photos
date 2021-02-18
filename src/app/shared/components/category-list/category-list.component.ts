import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { CategoryTeaser, ThumbnailSize } from '@models';

@Component({
    selector: 'app-shared-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
    @Input() categories: CategoryTeaser[] | null = null;
    @Input() thumbnailSize: ThumbnailSize = ThumbnailSize.default;
    @Input() showYears = false;

    categoryTrackByFn(index: number, teaser: CategoryTeaser): string {
        return `${teaser.type}_${teaser.id}`;
    }
}
