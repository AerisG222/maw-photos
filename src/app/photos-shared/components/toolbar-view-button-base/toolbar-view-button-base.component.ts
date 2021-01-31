import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { PhotoViewModeSelectable } from '@core/facades/photo-view-mode-selectable';
import { PhotoViewMode } from '@models';

@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class ToolbarViewButtonBaseComponent {
    isActive$ = this.viewModeSelectable.activePhotoViewMode$.pipe(
        map(activeView => activeView === this.viewMode)
    );

    constructor(public viewModeSelectable: PhotoViewModeSelectable, private viewMode: PhotoViewMode) { }

    onSelectView() {
        this.viewModeSelectable.selectPhotoViewMode(this.viewMode);
    }
}
