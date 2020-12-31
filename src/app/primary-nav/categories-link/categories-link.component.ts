import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouteHelperService } from 'src/app/core/services/route-helper.service';

@Component({
    selector: 'app-primary-nav-categories-link',
    templateUrl: './categories-link.component.html',
    styleUrls: ['./categories-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesLinkComponent {
    categoriesLink = this.routeHelperService.categoriesAbs();

    constructor(private routeHelperService: RouteHelperService) {

    }
}
