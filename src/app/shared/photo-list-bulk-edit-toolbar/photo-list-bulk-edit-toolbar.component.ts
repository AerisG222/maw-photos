import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button/public-api';
import { Store } from '@ngrx/store';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { PhotoStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-photo-list-bulk-edit-toolbar',
    templateUrl: './photo-list-bulk-edit-toolbar.component.html',
    styleUrls: ['./photo-list-bulk-edit-toolbar.component.scss']
})
export class PhotoListBulkEditToolbarComponent implements OnInit {
    private hotkeys: Hotkey[] = [];

    @ViewChild('bulkEditViewButton') bulkEditViewButton: MatButton;

    constructor(
        private store$: Store<{}>,
        private hotkeysService: HotkeysService
    ) { }

    ngOnInit(): void {
        this.configureHotkeys();
    }

    onToggleBulkEditView(): void {
        this.store$.dispatch(PhotoStoreActions.toggleBulkEditViewRequest());
    }

    private configureHotkeys(): void {
        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('b', (event: KeyboardEvent) => this.onHotkeyBulkEditView(event), [], 'Exit Bulk Edit View')
        ) as Hotkey);
    }

    private onHotkeyBulkEditView(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.bulkEditViewButton);
        this.onToggleBulkEditView();

        return false;
    }

    private triggerButtonRipple(button: MatButton) {
        if (button && !button.disabled) {
            button.ripple.launch({ centered: true });
        }
    }
}
