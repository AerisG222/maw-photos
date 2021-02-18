import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoViewMode } from '@models';
import { PhotoViewModeSelectable } from '@core/facades/photo-view-mode-selectable';
import { ToolbarViewButtonBaseComponent } from '../toolbar-view-button-base/toolbar-view-button-base.component';

@Component({
    selector: 'app-toolbar-view-map-button',
    templateUrl: './toolbar-view-map-button.component.html',
    styleUrls: ['./toolbar-view-map-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarViewMapButtonComponent extends ToolbarViewButtonBaseComponent {
    constructor(
        public viewModeSelectable: PhotoViewModeSelectable,
        public store: Store
    ) {
        super(viewModeSelectable, store, PhotoViewMode.map);
    }
}
