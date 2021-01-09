import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouteHelperService } from '@core/services/route-helper.service';

@Component({
    selector: 'app-primary-nav-search-link',
    templateUrl: './search-link.component.html',
    styleUrls: ['./search-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLinkComponent {
    searchLink = this.routeHelperService.searchAbs();

    constructor(private routeHelperService: RouteHelperService) {

    }
}
