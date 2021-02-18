import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

import { PhotoStoreActions } from '@core/root-store';

@Component({
    selector: 'app-grid-photo',
    templateUrl: './grid-photo.component.html',
    styleUrls: ['./grid-photo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridPhotoComponent implements OnInit, OnDestroy {
    hotkey: Hotkey | null = null;

    constructor(private store: Store, private hotkeysService: HotkeysService) {}

    ngOnInit(): void {
        this.hotkey = new Hotkey(
            'esc',
            (event: KeyboardEvent) => this.closeMainPhoto(event),
            [],
            'Close Photo / Return to Grid'
        );

        this.hotkeysService.add(this.hotkey);
    }

    ngOnDestroy(): void {
        if (this.hotkey) {
            this.hotkeysService.remove(this.hotkey);
        }
    }

    closeMainPhoto(event: KeyboardEvent) {
        this.store.dispatch(PhotoStoreActions.navigateUpFromIndividualPhoto());

        return false;
    }
}
