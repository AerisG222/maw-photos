import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';
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
    styleUrls: ['./category-list-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListToolbarComponent implements OnInit, OnDestroy {
    private hotkeys: Hotkey[] = [];
    private destroySub = new Subscription();

    @ViewChild('toggleTitlesButton') toggleTitlesButton: MatButton;
    @ViewChild('toggleThumbnailSizeButton') toggleThumbnailSizeButton: MatButton;
    @ViewChild('toggleMarginsButton') toggleMarginsButton: MatButton;
    @ViewChild('toggleListTypeButton') toggleListTypeButton: MatButton;
    @ViewChild('toggleListThumbnailSizeButton') toggleListThumbnailSizeButton: MatButton;

    settings: Settings;
    isListView$: Observable<boolean>;
    isGridView$: Observable<boolean>;
    showCategoryTitles$: Observable<boolean>;

    constructor(
        private store$: Store<RootStoreState.State>,
        private hotkeysService: HotkeysService
    ) { }

    ngOnInit(): void {
        this.isListView$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListType),
                map(type => type.name === CategoryListType.list.name)
            );

        this.isGridView$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListType),
                map(type => type.name === CategoryListType.grid.name)
            );

        this.showCategoryTitles$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListShowCategoryTitles)
            );

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('g', (event: KeyboardEvent) => this.onHotkeyToggleListType(event), [], 'Toggle Grid/List View')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('m', (event: KeyboardEvent) => this.onHotkeyToggleMargins(event), [], 'Toggle Category Margins')
        ) as Hotkey);

        this.destroySub.add(this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListType),
                tap(type => {
                    this.removeThumbnailSizeHotkey();
                    this.removeShowTitleHotkey();

                    switch (type) {
                        case CategoryListType.grid:
                            this.hotkeys.push(this.hotkeysService.add(
                                new Hotkey('t', (event: KeyboardEvent) => this.onHotkeyToggleTitle(event), [], 'Toggle Category Titles')
                            ) as Hotkey);

                            this.hotkeys.push(this.hotkeysService.add(
                                new Hotkey('s', (event: KeyboardEvent) =>
                                    this.onHotkeyToggleSize(event), [], 'Toggle Grid Thumbnail Size')
                            ) as Hotkey);

                            break;
                        case CategoryListType.list:
                            this.hotkeys.push(this.hotkeysService.add(
                                new Hotkey('s', (event: KeyboardEvent) =>
                                    this.onHotkeyToggleListThumbnailSize(event), [], 'Toggle List Thumbnail Size')
                            ) as Hotkey);

                            break;
                    }
                })
            ).subscribe()
        );

        this.destroySub.add(this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings)
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.hotkeysService.remove(this.hotkeys);
        this.destroySub.unsubscribe();
    }

    onToggleListType(): void {
        if (this.settings) {
            const type = CategoryListType.nextType(this.settings.categoryListListType.name);

            this.store$.dispatch(SettingsStoreActions.updateCategoryListListTypeRequest({ newType: type }));
        }
    }

    onToggleTitle(): void {
        this.store$.dispatch(SettingsStoreActions.toggleCategoryListCategoryTitlesRequest());
    }

    onToggleListThumbnailSize(): void {
        if (this.settings) {
            const size = ThumbnailSize.nextSize(this.settings.categoryListListViewThumbnailSize.name);

            this.store$.dispatch(SettingsStoreActions.updateCategoryListListViewThumbnailSizeRequest({ newSize: size }));
        }
    }

    onToggleSize(): void {
        if (this.settings && !this.settings.categoryListShowCategoryTitles) {
            const size = ThumbnailSize.nextSize(this.settings.categoryListThumbnailSize.name);

            this.store$.dispatch(SettingsStoreActions.updateCategoryListThumbnailSizeRequest({ newSize: size }));
        }
    }

    onToggleFilter(): void {
        if (this.settings) {
            const newFilter = CategoryFilter.nextFilter(this.settings.categoryListCategoryFilter.name);

            this.store$.dispatch(SettingsStoreActions.updateCategoryListCategoryFilterRequest({ newFilter }));
        }
    }

    onToggleMargins(): void {
        if (this.settings) {
            const newMargin = CategoryMargin.nextSize(this.settings.categoryListCategoryMargin.name);

            this.store$.dispatch(SettingsStoreActions.updateCategoryListCategoryMarginRequest({ newMargin }));
        }
    }

    private removeThumbnailSizeHotkey(): void {
        this.removeHotKey('s');
    }

    private removeShowTitleHotkey(): void {
        this.removeHotKey('t');
    }

    private removeHotKey(combo: string): void {
        for (let i = this.hotkeys.length - 1; i >= 0; i--) {
            const hotkey = this.hotkeys[i];

            if (hotkey.combo.length === 1 && hotkey.combo[0] === combo) {
                this.hotkeysService.remove(hotkey);
                this.hotkeys.splice(i, 1);
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

    private onHotkeyToggleMargins(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleMarginsButton);
        this.onToggleMargins();

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
