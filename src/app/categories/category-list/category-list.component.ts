import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Category } from 'src/app/core/models/category.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent {
    @Input() categories: Category[];
    @Input() showTitles: boolean;
    @Input() thumbnailSize: ThumbnailSize;
}
