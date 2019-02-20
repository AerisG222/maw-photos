import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent {
    @Input() categories: PhotoCategory[];
    @Input() showTitles: boolean;
    @Input() thumbnailSize: ThumbnailSize;
}
