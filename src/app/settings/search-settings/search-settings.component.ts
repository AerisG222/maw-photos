import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { allCategoryViewModes, CategoryMargin, ThumbnailSize } from '@models';
import { DEFAULT_SEARCH_GRID_VIEW_SETTINGS } from 'src/app/models/settings/search-grid-view-settings';
import { DEFAULT_SEARCH_SETTINGS } from 'src/app/models/settings/search-page-settings';

@Component({
    selector: 'app-search-settings',
    templateUrl: './search-settings.component.html',
    styleUrls: ['./search-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchSettingsComponent {
    form: FormGroup;
    margins = CategoryMargin.allCategoryMargins;
    viewModes = allCategoryViewModes;
    thumbnailSizes = ThumbnailSize.allSizes;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            page: this.fb.group({
                viewMode: DEFAULT_SEARCH_SETTINGS.viewMode
            }),
            grid: this.fb.group({
                showTitles: DEFAULT_SEARCH_GRID_VIEW_SETTINGS.showTitles,
                showYears: DEFAULT_SEARCH_GRID_VIEW_SETTINGS.showYears,
                margin: DEFAULT_SEARCH_GRID_VIEW_SETTINGS.margin,
                thumbnailSize: DEFAULT_SEARCH_GRID_VIEW_SETTINGS.thumbnailSize
            }),
            list: this.fb.group({
                margin: DEFAULT_SEARCH_GRID_VIEW_SETTINGS.margin,
                thumbnailSize: DEFAULT_SEARCH_GRID_VIEW_SETTINGS.thumbnailSize
            })
        });
    }

    onSave() {

    }

    onCancel() {

    }
}
