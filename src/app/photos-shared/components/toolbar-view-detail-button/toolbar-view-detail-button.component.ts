import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PhotoStoreActions, RouterStoreSelectors } from 'src/app/core/root-store';
import { RouteHelperService } from 'src/app/core/services/route-helper.service';

@Component({
    selector: 'app-toolbar-view-detail-button',
    templateUrl: './toolbar-view-detail-button.component.html',
    styleUrls: ['./toolbar-view-detail-button.component.scss']
})
export class ToolbarViewDetailButtonComponent {
    isActive$ = this.store.select(RouterStoreSelectors.isPhotosDetailView);

    constructor(
        private store: Store
    ) {

    }

    onToggleDetailView(): void {
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelperService.photoViewDetail }));
    }
}