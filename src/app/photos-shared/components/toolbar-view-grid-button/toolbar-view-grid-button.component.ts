import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from '@core/root-store';
import { PhotoViewMode, RouteHelper } from '@models';
import { PhotoViewModeSelectable } from '@core/facades/photo-view-mode-selectable';

@Component({
    selector: 'app-toolbar-view-grid-button',
    templateUrl: './toolbar-view-grid-button.component.html',
    styleUrls: ['./toolbar-view-grid-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarViewGridButtonComponent {
    @Input() isActive = false;

    constructor(
        private store: Store,
        private viewMode: PhotoViewModeSelectable
    ) {

    }

    onToggleGridView(): void {
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelper.photoViewGrid }));
        this.viewMode.selectPhotoViewMode(PhotoViewMode.grid);
    }
}
