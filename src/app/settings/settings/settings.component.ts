import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { RootStoreState, SettingsStoreActions, SettingsStoreSelectors } from '../../core/root-store';
import { Settings } from '../../core/models/settings.model';
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
    randomDurations = [ 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 45, 60 ];

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
            showCategoryPhotoList: [true],
            randomDuration: [3],
            photoInfoPanelShowRatings: [true],
            photoInfoPanelShowComments: [true],
            photoInfoPanelShowExif: [false],
            photoInfoPanelShowEffects: [false],
            showPhotoListToolbar: [true],
            photoInfoPanelShowMinimap: [false]
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
            showCategoryPhotoList: this.form.get('showCategoryPhotoList').value,
            randomDisplayDurationSeconds: this.form.get('randomDuration').value,
            photoInfoPanelShowComments: this.form.get('photoInfoPanelShowComments').value,
            photoInfoPanelShowEffects: this.form.get('photoInfoPanelShowEffects').value,
            photoInfoPanelShowExif: this.form.get('photoInfoPanelShowExif').value,
            photoInfoPanelShowRatings: this.form.get('photoInfoPanelShowRatings').value,
            photoListToolbarExpandedState: this.form.get('showPhotoListToolbar').value,
            photoInfoPanelShowMinimap: this.form.get('photoInfoPanelShowMinimap').value
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
        this.form.get('randomDuration').setValue(settings.randomDisplayDurationSeconds);
        this.form.get('photoInfoPanelShowComments').setValue(settings.photoInfoPanelShowComments);
        this.form.get('photoInfoPanelShowEffects').setValue(settings.photoInfoPanelShowEffects);
        this.form.get('photoInfoPanelShowExif').setValue(settings.photoInfoPanelShowExif);
        this.form.get('photoInfoPanelShowRatings').setValue(settings.photoInfoPanelShowRatings);
        this.form.get('showPhotoListToolbar').setValue(settings.photoListToolbarExpandedState);
        this.form.get('photoInfoPanelShowMinimap').setValue(settings.photoInfoPanelShowMinimap);
    }
}
