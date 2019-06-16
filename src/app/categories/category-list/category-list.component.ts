import { Component, Input } from '@angular/core';

import { Category } from 'src/app/core/models/category.model';
import { CategoryType } from 'src/app/core/models/category-type.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
    @Input() categories: Category[];
    @Input() thumbnailSize: ThumbnailSize;

    categoryTypes = CategoryType;
    columnsToDisplay = [ 'icon', 'thumbnail', 'title' ];

    constructor(
        private router: Router
    ) { }

    selectCategory(category: Category) {
        if (!!category) {
            const args = [];

            args.push('/categories');

            switch (category.type) {
                case CategoryType.photo:
                    args.push('photos');
                    break;
                case CategoryType.video:
                    args.push('videos');
                    break;
                default:
                    throw new Error('Invalid category type');
            }

            args.push(category.id);

            this.router.navigate(args);
        }
    }
}
