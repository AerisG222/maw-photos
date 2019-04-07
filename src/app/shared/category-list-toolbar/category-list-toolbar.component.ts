import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { tap, map, takeUntil } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { CategoryFilter } from 'src/app/core/models/category-filter.model';
import { CategoryListType } from 'src/app/core/models/category-list-type.model';
import { CategoryMargin } from 'src/app/core/models/category-margin.model';
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
    private destroy$ = new Subject<boolean>();

    @ViewChild('toggleTitlesButton') toggleTitlesButton: MatButton;
    @ViewChild('toggleThumbnailSizeButton') toggleThumbnailSizeButton: MatButton;
    @ViewChild('toggleMarginsButton') toggleMarginsButton: MatButton;
    @ViewChild('toggleFilterButton') toggleFilterButton: MatButton;
    @ViewChild('toggleYearFilterButton') toggleYearFilterButton: MatButton;
    @ViewChild('toggleToolbarButton') toggleToolbarButton: MatButton;
    @ViewChild('toggleListTypeButton') toggleListTypeButton: MatButton;
    @ViewChild('toggleListThumbnailSizeButton') toggleListThumbnailSizeButton: MatButton;

    settings: Settings;
    isToolbarExpanded$: Observable<boolean>;
    isListView$: Observable<boolean>;
    isGridView$: Observable<boolean>;
    showCategoryTitles$: Observable<boolean>;

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit(): void {
        this.isListView$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListType),
                map(type => type.name === CategoryListType.list.name)
            );

        this.isGridView$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListType),
                map(type => type.name === CategoryListType.grid.name)
            );

        this.showCategoryTitles$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListShowCategoryTitles)
            );

        this.isToolbarExpanded$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListToolbarExpandedState)
            );

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('g', (event: KeyboardEvent) => this.onHotkeyToggleListType(event), [], 'Toggle Grid/List View')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('y', (event: KeyboardEvent) => this.onHotkeyToggleYearFilter(event), [], 'Toggle Year Filter')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('f', (event: KeyboardEvent) => this.onHotkeyToggleFilter(event), [], 'Toggle Category Filter')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('t', (event: KeyboardEvent) => this.onHotkeyToggleTitle(event), [], 'Toggle Category Titles')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('m', (event: KeyboardEvent) => this.onHotkeyToggleMargins(event), [], 'Toggle Category Margins')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('x', (event: KeyboardEvent) => this.onHotkeyToggleToolbar(event), [], 'Show/Hide Toolbar')
        ));

        this._store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListType),
                tap(type => {
                    this.removeThumbnailSizeHotkey();

                    switch (type) {
                        case CategoryListType.grid:
                            this._hotkeys.push(<Hotkey> this._hotkeysService.add(
                                new Hotkey('s', (event: KeyboardEvent) =>
                                    this.onHotkeyToggleSize(event), [], 'Toggle Grid Thumbnail Size')
                            ));
                            break;
                        case CategoryListType.list:
                            this._hotkeys.push(<Hotkey> this._hotkeysService.add(
                                new Hotkey('s', (event: KeyboardEvent) =>
                                    this.onHotkeyToggleListThumbnailSize(event), [], 'Toggle List Thumbnail Size')
                            ));
                            break;
                    }
                }),
                takeUntil(this.destroy$)
            ).subscribe();

        this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings),
                takeUntil(this.destroy$)
            ).subscribe();
    }

    ngOnDestroy(): void {
        this._hotkeysService.remove(this._hotkeys);
        this.destroy$.next(true);
    }

    onToggleListType(): void {
        if (this.settings) {
            const type = CategoryListType.nextType(this.settings.categoryListListType.name);

            this._store$.dispatch(new SettingsStoreActions.UpdateCategoryListListTypeRequestAction({ newType: type }));
        }
    }

    onToggleTitle(): void {
        this._store$.dispatch(new SettingsStoreActions.ToggleCategoryListCategoryTitlesRequestAction());
    }

    onToggleListThumbnailSize(): void {
        if (this.settings) {
            const size = ThumbnailSize.nextSize(this.settings.categoryListListViewThumbnailSize.name);

            this._store$.dispatch(new SettingsStoreActions.UpdateCategoryListListViewThumbnailSizeRequestAction({ newSize: size }));
        }
    }

    onToggleSize(): void {
        if (this.settings && !this.settings.categoryListShowCategoryTitles) {
            const size = ThumbnailSize.nextSize(this.settings.categoryListThumbnailSize.name);

            this._store$.dispatch(new SettingsStoreActions.UpdateCategoryListThumbnailSizeRequestAction({ newSize: size }));
        }
    }

    onToggleYearFilter(): void {
        this._store$.dispatch(new SettingsStoreActions.ToggleCategoryListYearFilterRequestAction());
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

    onToggleCategoryListToolbar(): void {
        this._store$.dispatch(new SettingsStoreActions.ToggleCategoryListToolbarExpandedStateRequestAction());
    }

    private removeThumbnailSizeHotkey(): void {
        for(let i = this._hotkeys.length - 1; i >= 0; i--) {
            const hotkey = this._hotkeys[i];

            if (hotkey.combo.length === 1 && hotkey.combo[0] === 's') {
                this._hotkeysService.remove(hotkey);
                this._hotkeys.splice(i, 1);
            }
        }
    }

    private onHotkeyToggleTitle(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleTitlesButton);
        this.onToggleTitle();

        return false;
    }

    private onHotkeyToggleListThumbnailSize(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleListThumbnailSizeButton);
        this.onToggleListThumbnailSize();

        return false;
    }

    private onHotkeyToggleSize(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleThumbnailSizeButton);
        this.onToggleSize();

        return false;
    }

    private onHotkeyToggleYearFilter(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleYearFilterButton);
        this.onToggleYearFilter();

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

    private onHotkeyToggleToolbar(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleToolbarButton);
        this.onToggleCategoryListToolbar();

        return false;
    }

    private onHotkeyToggleListType(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleListTypeButton);
        this.onToggleListType();

        return false;
    }

    private triggerButtonRipple(button: MatButton) {
        if (button && !button.disabled) {
            button.ripple.launch({ centered: true });
        }
    }
}
