import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';

import { RootStoreState, SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';
import { Settings } from 'src/app/core/models/settings.model';
import { takeUntil, tap } from 'rxjs/operators';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Component({
    selector: 'app-category-list-mini-settings',
    templateUrl: './category-list-mini-settings.component.html',
    styleUrls: ['./category-list-mini-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListMiniSettingsComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<boolean>();
    settings: Settings;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) { }

    ngOnInit(): void {
        const settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings),
                takeUntil(this.destroy$)
            ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

    onToggleTitle(): void {
        if (!this.settings) {
            return;
        }

        this.settings.showCategoryTitles = !this.settings.showCategoryTitles;

        this._store$.dispatch(new SettingsStoreActions.SaveRequestAction({ settings: this.settings }));
    }

    onToggleSize(): void {
        if (!this.settings) {
            return;
        }

        this.settings.categoryThumbnailSize = ThumbnailSize.nextSize(this.settings.categoryThumbnailSize.name);

        this._store$.dispatch(new SettingsStoreActions.SaveRequestAction({ settings: this.settings }));
    }
}
