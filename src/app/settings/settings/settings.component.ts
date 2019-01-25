import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Theme } from '../../core/models/theme.model';
import { RootStoreState, SettingsStoreActions, SettingsStoreSelectors } from '../../core/root-store';
import { Settings } from '../../core/models/settings.model';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    form: FormGroup;
    themes = Theme.allThemes;
    private _settings;

    constructor(
        private _formBuilder: FormBuilder,
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            theme: ['', Validators.required],
            showCategoryTitles: [true],
            smallCategoryThumbnails: [false]
        });

        this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                take(1)
            )
            .subscribe(settings => {
                this._settings = settings;

                this.updateForm(this._settings);
            });

        this.loadSettings();
    }

    onSave(): void {
        this._settings.theme = Theme.forName(this.form.get('theme').value);
        this._settings.showCategoryTitles = this.form.get('showCategoryTitles').value;
        this._settings.smallCategoryThumbnails = this.form.get('smallCategoryThumbnails').value;

        this._store$.dispatch(
            new SettingsStoreActions.SaveRequestAction({ settings: this._settings })
        );
    }

    onCancel(): void {
        this.loadSettings();
    }

    private loadSettings(): void {
        this._store$.dispatch(
            new SettingsStoreActions.LoadRequestAction()
        );
    }

    private updateForm(settings: Settings): void {
        this.form.get('theme').setValue(settings.theme.name);
        this.form.get('showCategoryTitles').setValue(settings.showCategoryTitles);
        this.form.get('smallCategoryThumbnails').setValue(settings.smallCategoryThumbnails);
    }
}
