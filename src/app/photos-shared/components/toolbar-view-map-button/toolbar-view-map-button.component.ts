import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from '@core/root-store';
import { RouteHelper } from '@models';

@Component({
    selector: 'app-toolbar-view-map-button',
    templateUrl: './toolbar-view-map-button.component.html',
    styleUrls: ['./toolbar-view-map-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarViewMapButtonComponent {
    @Input() isActive = false;

    constructor(
        private store: Store
    ) {

    }

    onToggleMapView(): void {
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelper.photoViewMap }));
    }
}
