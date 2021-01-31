import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from '@core/root-store';
import { PhotoViewMode, RouteHelper } from '@models';
import { PhotoViewModeSelectable } from '@core/facades/photo-view-mode-selectable';

@Component({
    selector: 'app-toolbar-view-fullscreen-button',
    templateUrl: './toolbar-view-fullscreen-button.component.html',
    styleUrls: ['./toolbar-view-fullscreen-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarViewFullscreenButtonComponent {
    @Input() isActive = false;

    constructor(
        private store: Store,
        private viewMode: PhotoViewModeSelectable
    ) {

    }

    onToggleFullscreen(): void {
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelper.photoViewFullscreen }));
        this.viewMode.selectPhotoViewMode(PhotoViewMode.fullscreen);
    }
}
