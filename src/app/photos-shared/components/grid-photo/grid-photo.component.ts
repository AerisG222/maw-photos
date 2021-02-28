import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

import { PhotoStoreActions, RouterStoreSelectors } from '@core/root-store';
import { PhotoGridSettingsFacade } from '@core/facades/settings/random-grid-settings-facade';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-grid-photo',
    templateUrl: './grid-photo.component.html',
    styleUrls: ['./grid-photo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridPhotoComponent implements OnInit, OnDestroy {
    hotkey: Hotkey | null = null;
    showHeader$ = combineLatest([
        this.store.select(RouterStoreSelectors.inRandomArea),
        this.gridSettings.settings$
    ]).pipe(
        map(([inRandom, settings]) => {
            return inRandom && settings.showBreadcrumbs;
        })
    );

    constructor(private store: Store, private hotkeysService: HotkeysService, private gridSettings: PhotoGridSettingsFacade) {}

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
