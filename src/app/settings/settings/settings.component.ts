import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { Settings } from 'src/app/core/models/settings.model';
import { Theme } from 'src/app/core/models/theme.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { RootStoreState, SettingsStoreActions, SettingsStoreSelectors } from 'src/app/core/root-store';


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
            appTheme: ['', Validators.required],

            categoryListShowCategoryTitles: [true],
            categoryListThumbnailSize: [''],

            photoListShowCategoryBreadcrumbs: [true],
            photoListThumbnailSize: [''],
            photoListShowPhotoList: [true],
            photoListSlideshowDisplayDurationSeconds: [2],
            photoListToolbarExpandedState: [true],
            photoListFullscreenToolbarExpandedState: [true],

            photoInfoPanelShowComments: [true],
            photoInfoPanelShowEffects: [false],
            photoInfoPanelShowExif: [false],
            photoInfoPanelShowMinimap: [false],
            photoInfoPanelShowRatings: [true],
            photoInfoPanelExpandedState: [false]
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
            appTheme: Theme.forName(this.form.get('appTheme').value),

            categoryListShowCategoryTitles: this.form.get('categoryListShowCategoryTitles').value,
            categoryListThumbnailSize: ThumbnailSize.forName(this.form.get('categoryListThumbnailSize').value),

            photoListShowCategoryBreadcrumbs: this.form.get('photoListShowCategoryBreadcrumbs').value,
            photoListThumbnailSize: ThumbnailSize.forName(this.form.get('photoListThumbnailSize').value),
            photoListShowPhotoList: this.form.get('photoListShowPhotoList').value,
            photoListSlideshowDisplayDurationSeconds: this.form.get('photoListSlideshowDisplayDurationSeconds').value,
            photoListToolbarExpandedState: this.form.get('photoListToolbarExpandedState').value,
            photoListFullscreenToolbarExpandedState: this.form.get('photoListFullscreenToolbarExpandedState').value,

            photoInfoPanelShowComments: this.form.get('photoInfoPanelShowComments').value,
            photoInfoPanelShowEffects: this.form.get('photoInfoPanelShowEffects').value,
            photoInfoPanelShowExif: this.form.get('photoInfoPanelShowExif').value,
            photoInfoPanelShowMinimap: this.form.get('photoInfoPanelShowMinimap').value,
            photoInfoPanelShowRatings: this.form.get('photoInfoPanelShowRatings').value,
            photoInfoPanelExpandedState: this.form.get('photoInfoPanelExpandedState').value
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
        this.form.get('appTheme').setValue(settings.appTheme.name);

        this.form.get('categoryListShowCategoryTitles').setValue(settings.categoryListShowCategoryTitles);
        this.form.get('categoryListThumbnailSize').setValue(settings.categoryListThumbnailSize.name);

        this.form.get('photoListShowCategoryBreadcrumbs').setValue(settings.photoListShowCategoryBreadcrumbs);
        this.form.get('photoListThumbnailSize').setValue(settings.photoListThumbnailSize.name);
        this.form.get('photoListShowPhotoList').setValue(settings.photoListShowPhotoList);
        this.form.get('photoListSlideshowDisplayDurationSeconds').setValue(settings.photoListSlideshowDisplayDurationSeconds);
        this.form.get('photoListToolbarExpandedState').setValue(settings.photoListToolbarExpandedState);
        this.form.get('photoListFullscreenToolbarExpandedState').setValue(settings.photoListFullscreenToolbarExpandedState);

        this.form.get('photoInfoPanelShowComments').setValue(settings.photoInfoPanelShowComments);
        this.form.get('photoInfoPanelShowEffects').setValue(settings.photoInfoPanelShowEffects);
        this.form.get('photoInfoPanelShowExif').setValue(settings.photoInfoPanelShowExif);
        this.form.get('photoInfoPanelShowMinimap').setValue(settings.photoInfoPanelShowMinimap);
        this.form.get('photoInfoPanelShowRatings').setValue(settings.photoInfoPanelShowRatings);
        this.form.get('photoInfoPanelExpandedState').setValue(settings.photoInfoPanelExpandedState);
    }
}
