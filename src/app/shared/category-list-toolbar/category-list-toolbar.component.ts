import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { Settings } from 'src/app/core/models/settings.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { RootStoreState, SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';
import { MatButton } from '@angular/material';
import { CategoryMargin } from 'src/app/core/models/category-margin.model';
import { CategoryFilter } from 'src/app/core/models/category-filter.model';

@Component({
    selector: 'app-category-list-toolbar',
    templateUrl: './category-list-toolbar.component.html',
    styleUrls: ['./category-list-toolbar.component.scss']
})
export class CategoryListToolbarComponent implements OnInit, OnDestroy {
    private _hotkeys: Hotkey[] = [];

    @ViewChild('toggleTitlesButton') toggleTitlesButton: MatButton;
    @ViewChild('toggleThumbnailSizeButton') toggleThumbnailSizeButton: MatButton;
    @ViewChild('toggleMarginsButton') toggleMarginsButton: MatButton;
    @ViewChild('toggleFilterButton') toggleFilterButton: MatButton;

    settings: Settings;
    settings$: Observable<Settings>;

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit(): void {
        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('f', (event: KeyboardEvent) => this.onHotkeyToggleFilter(event), [], 'Toggle Category Filter')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('t', (event: KeyboardEvent) => this.onHotkeyToggleTitle(event), [], 'Toggle Category Titles')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('s', (event: KeyboardEvent) => this.onHotkeyToggleSize(event), [], 'Toggle Category Thumbnail Size')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('m', (event: KeyboardEvent) => this.onHotkeyToggleMargins(event), [], 'Toggle Category Margins')
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

    onToggleFilter(): void {
        if (this.settings) {
            const newFilter = CategoryFilter.nextFilter(this.settings.categoryListCategoryFilter.name);

            this._store$.dispatch(new SettingsStoreActions.UpdateCategoryListCategoryFilterRequestAction({ newFilter: newFilter }));
        }
    }

    onToggleMargins(): void {
        if (this.settings) {
            const newMargin = CategoryMargin.nextSize(this.settings.categoryListCategoryMargin.name);

            this._store$.dispatch(new SettingsStoreActions.UpdateCategoryListCategoryMarginRequestAction({ newMargin: newMargin }));
        }
    }

    private onHotkeyToggleTitle(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleTitlesButton);
        this.onToggleTitle();

        return false;
    }

    private onHotkeyToggleSize(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleThumbnailSizeButton);
        this.onToggleSize();

        return false;
    }

    private onHotkeyToggleFilter(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleFilterButton);
        this.onToggleFilter();

        return false;
    }

    private onHotkeyToggleMargins(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleMarginsButton);
        this.onToggleMargins();

        return false;
    }

    private triggerButtonRipple(button: MatButton) {
        if (button && !button.disabled) {
            button.ripple.launch({ centered: true });
        }
    }
}
