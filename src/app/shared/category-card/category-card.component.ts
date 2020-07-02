import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { CategoryType } from 'src/app/models/category-type.model';
import { CategoryTeaser } from 'src/app/models/category-teaser.model';

@Component({
    selector: 'app-shared-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent {
    @Input() category: CategoryTeaser | null = null;
    @Input() showTitle: boolean | null = null;
    @Input() showYear: boolean | null = null;
    @Input() thumbnailSize: ThumbnailSize | null = null;

    categoryTypes = CategoryType;

    getClass(): string {
        const classes: string[] = [];

        if (this.showTitle) {
            classes.push('show_title');
        }

        if (this.showYear) {
            classes.push('show_year');
        }

        if (this.showTitle || this.showYear) {
            classes.push(ThumbnailSize.default.klass);
        } else if (!!this.thumbnailSize) {
            classes.push(this.thumbnailSize.klass);
        }

        return classes.join(' ');
    }
}
