import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RootStoreState, SettingsStoreActions, SettingsStoreSelectors } from '../../core/root-store';
import { select, Store } from '@ngrx/store';
import { Settings } from '../../core/models/settings.model';
import { tap } from 'rxjs/operators';
import { Theme } from '../../core/models/theme.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    form: FormGroup;
    themes = Theme.allThemes;
    categoryThumbnailSizes = ThumbnailSize.allSizes;
    photoListThumbnailSizes = ThumbnailSize.allSizes;

    constructor(
        private _formBuilder: FormBuilder,
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            theme: ['', Validators.required],
            showCategoryTitles: [true],
            categoryThumbnailSize: [''],
            showCategoryBreadcrumbs: [true],
            photoListThumbnailSize: [''],
            showCategoryPhotoList: [true]
        });

        this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.updateForm(settings))
            )
            .subscribe();

        this.loadSettings();
    }

    onSave(): void {
        const settings = {
            theme: Theme.forName(this.form.get('theme').value),
            showCategoryTitles: this.form.get('showCategoryTitles').value,
            showCategoryBreadcrumbs: this.form.get('showCategoryBreadcrumbs').value,
            categoryThumbnailSize: ThumbnailSize.forName(this.form.get('categoryThumbnailSize').value),
            photoListThumbnailSize: ThumbnailSize.forName(this.form.get('photoListThumbnailSize').value),
            showCategoryPhotoList: this.form.get('showCategoryPhotoList').value
        };

        this._store$.dispatch(
            new SettingsStoreActions.SaveRequestAction({ settings: settings })
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
        this.form.get('showCategoryBreadcrumbs').setValue(settings.showCategoryBreadcrumbs);
        this.form.get('categoryThumbnailSize').setValue(settings.categoryThumbnailSize.name);
        this.form.get('photoListThumbnailSize').setValue(settings.photoListThumbnailSize.name);
        this.form.get('showCategoryPhotoList').setValue(settings.showCategoryPhotoList);
    }
}
