import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PhotoViewMode } from '@models';
import { PhotoViewModeSelectable } from '@core/facades/photo-view-mode-selectable';
import { ToolbarViewButtonBaseComponent } from '../toolbar-view-button-base/toolbar-view-button-base.component';

@Component({
    selector: 'app-toolbar-view-bulk-edit-button',
    templateUrl: './toolbar-view-bulk-edit-button.component.html',
    styleUrls: ['./toolbar-view-bulk-edit-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarViewBulkEditButtonComponent extends ToolbarViewButtonBaseComponent {
    constructor(public viewModeSelectable: PhotoViewModeSelectable) {
        super(viewModeSelectable, PhotoViewMode.bulkEdit);
    }
}
