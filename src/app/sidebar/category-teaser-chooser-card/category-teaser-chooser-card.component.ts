import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CategoryTeaserSelectable } from 'src/app/models/store-facades/category-teaser-selectable';

@Component({
    selector: 'app-sidebar-category-teaser-chooser-card',
    templateUrl: './category-teaser-chooser-card.component.html',
    styleUrls: ['./category-teaser-chooser-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTeaserChooserCardComponent {
    constructor(
        public categoryTeaserSelectable: CategoryTeaserSelectable
    ) {

    }
}
