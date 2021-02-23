import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterStoreSelectors } from '@core/root-store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-toolbar-group-select-view',
    templateUrl: './toolbar-group-select-view.component.html',
    styleUrls: ['./toolbar-group-select-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarGroupSelectViewComponent {
    enableMapView$ = this.store.select(RouterStoreSelectors.inPhotosArea);
    enableBulkEdit$ = this.store.select(RouterStoreSelectors.inPhotosArea);

    constructor(private store: Store) {}
}
