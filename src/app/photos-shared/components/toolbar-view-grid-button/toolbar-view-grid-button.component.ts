import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoViewMode, PhotoViewModeSelectable } from '@models';
import { ToolbarViewButtonBaseComponent } from '../toolbar-view-button-base/toolbar-view-button-base.component';

@Component({
    selector: 'app-toolbar-view-grid-button',
    templateUrl: './toolbar-view-grid-button.component.html',
    styleUrls: ['./toolbar-view-grid-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarViewGridButtonComponent extends ToolbarViewButtonBaseComponent {
    constructor(
        public viewModeSelectable: PhotoViewModeSelectable,
        public store: Store
    ) {
        super(viewModeSelectable, store, PhotoViewMode.grid);
    }
}
