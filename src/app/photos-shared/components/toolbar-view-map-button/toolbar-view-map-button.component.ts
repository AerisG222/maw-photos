import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from '@core/root-store';
import { PhotoViewMode, RouteHelper } from '@models';
import { PhotoViewModeSelectable } from '@core/facades/photo-view-mode-selectable';

@Component({
    selector: 'app-toolbar-view-map-button',
    templateUrl: './toolbar-view-map-button.component.html',
    styleUrls: ['./toolbar-view-map-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarViewMapButtonComponent {
    @Input() isActive = false;

    constructor(
        private store: Store,
        private viewMode: PhotoViewModeSelectable
    ) {

    }

    onToggleMapView(): void {
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelper.photoViewMap }));
        this.viewMode.selectPhotoViewMode(PhotoViewMode.map);
    }
}
