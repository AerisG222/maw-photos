import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouteHelper } from '@models';

@Component({
    selector: 'app-primary-nav-search-link',
    templateUrl: './search-link.component.html',
    styleUrls: ['./search-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLinkComponent {
    searchLink = RouteHelper.searchAbs();

}
