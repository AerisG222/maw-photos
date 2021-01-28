import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CategoryTeaser, CategoryType, RouteHelper, ThumbnailSize } from '@models';

@Component({
  selector: 'app-shared-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListItemComponent {
    @Input() category?: CategoryTeaser;
    @Input() thumbnailSize: ThumbnailSize = ThumbnailSize.default;
    @Input() showYears = false;

    categoryTypes = CategoryType;

    buildLink() {
        return RouteHelper.getCategoryRoute(this.category);
    }
}
