import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from '@core/root-store';
import { RouteHelper } from '@models';

@Component({
    selector: 'app-toolbar-view-detail-button',
    templateUrl: './toolbar-view-detail-button.component.html',
    styleUrls: ['./toolbar-view-detail-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarViewDetailButtonComponent {
    @Input() isActive = false;

    constructor(
        private store: Store
    ) {

    }

    onToggleDetailView(): void {
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelper.photoViewDetail }));
    }
}
