import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { allCategoryTypeFilters, CategoryMargin, ThumbnailSize, allCategoryViewModes } from '@models';
import { DEFAULT_CATEGORY_SETTINGS } from 'src/app/models/settings/category-page-settings';

@Component({
    selector: 'app-category-settings',
    templateUrl: './category-settings.component.html',
    styleUrls: ['./category-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategorySettingsComponent {
    form: FormGroup;
    typeFilters = allCategoryTypeFilters;
    margins = CategoryMargin.allCategoryMargins;
    thumbnailSizes = ThumbnailSize.allSizes;
    listViewThumbnailSizes = ThumbnailSize.allSizes;
    viewModes = allCategoryViewModes;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            page: this.fb.group({
                typeFilter: DEFAULT_CATEGORY_SETTINGS.typeFilter,
                viewMode: DEFAULT_CATEGORY_SETTINGS.viewMode,
            }),
            grid: this.fb.group({
                margin: DEFAULT_CATEGORY_SETTINGS.gridView.margin.name,
                thumbnailSize: DEFAULT_CATEGORY_SETTINGS.gridView.thumbnailSize.name,
                showTitles: DEFAULT_CATEGORY_SETTINGS.gridView.showTitles,
            }),
            list: this.fb.group({
                margin: DEFAULT_CATEGORY_SETTINGS.listView.margin.name,
                thumbnailSize: DEFAULT_CATEGORY_SETTINGS.listView.thumbnailSize.name,
            })
        });
    }

    onSave() {

    }

    onCancel() {

    }
}
