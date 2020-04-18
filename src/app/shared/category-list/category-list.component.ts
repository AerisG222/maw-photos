import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Category } from 'src/app/models/category.model';
import { CategoryType } from 'src/app/models/category-type.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { Router } from '@angular/router';
import { CategoryTeaser } from 'src/app/models/category-teaser.model';

@Component({
    selector: 'app-shared-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent {
    private readonly colsNoYear = [ 'icon', 'thumbnail', 'title' ];
    private readonly colsWithYear = [ 'icon', 'thumbnail', 'year', 'title' ];

    @Input() categories: CategoryTeaser[];
    @Input() thumbnailSize: ThumbnailSize;

    @Input() set showYears(showYear: boolean) {
        if (showYear) {
            this.columnsToDisplay = this.colsWithYear;
        } else {
            this.columnsToDisplay = this.colsNoYear;
        }
    }

    categoryTypes = CategoryType;
    columnsToDisplay = this.colsNoYear;

    constructor(
        private router: Router
    ) { }

    selectCategory(category: Category) {
        if (!!category) {
            const args = [];

            switch (category.type) {
                case CategoryType.photo:
                    args.push('/photos');
                    break;
                case CategoryType.video:
                    args.push('/videos');
                    break;
                default:
                    throw new Error('Invalid category type');
            }

            args.push(category.id);

            this.router.navigate(args);
        }
    }

    categoryTrackByFn(index: number, teaser: CategoryTeaser) {
        return `${teaser.type}_${teaser.id}`;
    }
}
