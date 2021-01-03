import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PhotoStoreActions, RouterStoreSelectors } from 'src/app/core/root-store';
import { RouteHelperService } from 'src/app/core/services/route-helper.service';

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
