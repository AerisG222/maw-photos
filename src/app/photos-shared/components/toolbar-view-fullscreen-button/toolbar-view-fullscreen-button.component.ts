import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PhotoStoreActions, RouterStoreSelectors } from '@core/root-store';
import { RouteHelperService } from '@core/services';

@Component({
    selector: 'app-toolbar-view-fullscreen-button',
    templateUrl: './toolbar-view-fullscreen-button.component.html',
    styleUrls: ['./toolbar-view-fullscreen-button.component.scss']
})
export class ToolbarViewFullscreenButtonComponent {
    isActive$ = this.store.select(RouterStoreSelectors.isPhotosFullscreenView);

    constructor(
        private store: Store
    ) {

    }

    onToggleFullscreen(): void {
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelperService.photoViewFullscreen }));
    }
}
