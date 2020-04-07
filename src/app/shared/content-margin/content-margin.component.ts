import { Component, Input } from '@angular/core';

import { CategoryMargin } from 'src/app/models/category-margin.model';

@Component({
    selector: 'app-content-margin',
    templateUrl: './content-margin.component.html',
    styleUrls: ['./content-margin.component.scss']
})
export class ContentMarginComponent {
    @Input() margin: CategoryMargin;
}
