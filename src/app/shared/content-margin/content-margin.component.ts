import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { CategoryMargin } from 'src/app/models/category-margin.model';

@Component({
    selector: 'app-shared-content-margin',
    templateUrl: './content-margin.component.html',
    styleUrls: ['./content-margin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentMarginComponent {
    @Input() margin?: CategoryMargin;
}
