import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

import { PhotoStoreActions, RouterStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-grid-photo',
    templateUrl: './grid-photo.component.html',
    styleUrls: ['./grid-photo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridPhotoComponent implements OnInit, OnDestroy {
    hotkey: Hotkey | null = null;
    isRandomView$ = this.store.select(RouterStoreSelectors.inRandomArea);

    constructor(private store: Store, private hotkeysService: HotkeysService) {}

    ngOnInit(): void {
        this.hotkey = new Hotkey(
            'esc',
            () => this.closeMainPhoto(),
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

    closeMainPhoto(): boolean {
        this.store.dispatch(PhotoStoreActions.navigateUpFromIndividualPhoto());

        return false;
    }
}
