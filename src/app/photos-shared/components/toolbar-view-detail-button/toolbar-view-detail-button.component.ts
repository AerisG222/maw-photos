import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoViewMode, PhotoViewModeSelectable } from '@models';
import { ToolbarViewButtonBaseComponent } from '../toolbar-view-button-base/toolbar-view-button-base.component';

@Component({
    selector: 'app-toolbar-view-detail-button',
    templateUrl: './toolbar-view-detail-button.component.html',
    styleUrls: ['./toolbar-view-detail-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarViewDetailButtonComponent extends ToolbarViewButtonBaseComponent {
    constructor(
        public viewModeSelectable: PhotoViewModeSelectable,
        public store: Store
    ) {
        super(viewModeSelectable, store, PhotoViewMode.detail, true);
    }
}
