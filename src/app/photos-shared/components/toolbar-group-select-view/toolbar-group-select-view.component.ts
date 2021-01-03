import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-toolbar-group-select-view',
    templateUrl: './toolbar-group-select-view.component.html',
    styleUrls: ['./toolbar-group-select-view.component.scss']
})
export class ToolbarGroupSelectViewComponent {
    constructor(
        private store: Store
    ) {

    }
}
