import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { Settings } from 'src/app/core/models/settings.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { RootStoreState, SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-category-list-toolbar',
    templateUrl: './category-list-toolbar.component.html',
    styleUrls: ['./category-list-toolbar.component.scss']
})
export class CategoryListToolbarComponent implements OnInit, OnDestroy {
    private _hotkeys: Hotkey[] = [];

    settings: Settings;
    settings$: Observable<Settings>;

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit(): void {
        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('t', (event: KeyboardEvent) => this.onHotkeyToggleTitle(event), [], 'Toggle Category Titles')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('s', (event: KeyboardEvent) => this.onHotkeyToggleSize(event), [], 'Toggle Category Thumbnail Size')
        ));

        this.settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings)
            );
    }

    ngOnDestroy(): void {
        this._hotkeysService.remove(this._hotkeys);
    }

    onToggleTitle(): void {
        this._store$.dispatch(new SettingsStoreActions.ToggleCategoryListCategoryTitlesRequestAction());
    }

    onToggleSize(): void {
        if (this.settings && !this.settings.categoryListShowCategoryTitles) {
            const size = ThumbnailSize.nextSize(this.settings.categoryListThumbnailSize.name);

            this._store$.dispatch(new SettingsStoreActions.UpdateCategoryListThumbnailSizeRequestAction({ newSize: size }));
        }
    }

    private onHotkeyToggleTitle(evt: KeyboardEvent): boolean {
        this.onToggleTitle();

        return false;
    }

    private onHotkeyToggleSize(evt: KeyboardEvent): boolean {
        this.onToggleSize();

        return false;
    }
}
