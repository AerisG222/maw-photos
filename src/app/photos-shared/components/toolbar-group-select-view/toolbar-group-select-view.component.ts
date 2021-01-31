import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterStoreSelectors } from '@core/root-store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-toolbar-group-select-view',
    templateUrl: './toolbar-group-select-view.component.html',
    styleUrls: ['./toolbar-group-select-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarGroupSelectViewComponent {
    // TODO: remove these inputs
    @Input() isBulkEditViewActive = false;
    @Input() isDetailViewActive = false;
    @Input() isFullscreenViewActive = false;
    @Input() isGridViewActive = false;
    @Input() isMapViewActive = false;

    enableMapView$ = this.store.select(RouterStoreSelectors.isPhotosView);
    enableBulkEdit$ = this.store.select(RouterStoreSelectors.isPhotosView);

    constructor(
        private store: Store
    ) {

    }
}
