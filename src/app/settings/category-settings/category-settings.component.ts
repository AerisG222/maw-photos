import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';

import { CategoryFilterSettingsFacade } from '@core/facades/settings/category-filter-settings-facade';
import { CategoryGridSettingsFacade } from '@core/facades/settings/category-grid-settings-facade';
import { CategoryListSettingsFacade } from '@core/facades/settings/category-list-settings-facade';
import { CategoryPageSettingsFacade } from '@core/facades/settings/category-page-settings-facade';
import { allMargins, CategoryGridViewSettings } from '@models';
import { CategoryListViewSettings } from '@models';
import { CategoryPageSettings } from '@models';
import {
    allCategoryTypeFilters,
    Margin,
    ThumbnailSize,
    allCategoryViewModes,
    toCategoryViewMode,
    toCategoryTypeFilter,
    CategoryViewMode,
    CategoryTypeFilter,
} from '@models';

@Component({
    selector: 'app-category-settings',
    templateUrl: './category-settings.component.html',
    styleUrls: ['./category-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySettingsComponent {
    form: FormGroup;
    typeFilters = allCategoryTypeFilters;
    margins = allMargins;
    thumbnailSizes = ThumbnailSize.allSizes;
    listViewThumbnailSizes = ThumbnailSize.allSizes;
    viewModes = allCategoryViewModes;

    constructor(
        private fb: FormBuilder,
        private filterFacade: CategoryFilterSettingsFacade,
        private pageFacade: CategoryPageSettingsFacade,
        private gridFacade: CategoryGridSettingsFacade,
        private listFacade: CategoryListSettingsFacade
    ) {
        this.form = this.fb.group({
            page: this.fb.group({
                typeFilter: '',
                viewMode: '',
            }),
            grid: this.fb.group({
                margin: '',
                thumbnailSize: '',
                showTitles: '',
            }),
            list: this.fb.group({
                margin: '',
                thumbnailSize: '',
            }),
        });

        this.resetForm();
    }

    onSave() {
        const typeFilter = toCategoryTypeFilter(
            this.form.get('page.typeFilter')?.value
        ) as CategoryTypeFilter;

        const pageSettings = this.readPageForm();
        const gridSettings = this.readGridForm();
        const listSettings = this.readListForm();

        this.filterFacade.saveTypeFilter(typeFilter);
        this.pageFacade.save(pageSettings);
        this.gridFacade.save(gridSettings);
        this.listFacade.save(listSettings);
    }

    onCancel() {
        this.resetForm();
    }

    private resetForm() {
        combineLatest([
            this.filterFacade.settings$,
            this.pageFacade.settings$,
            this.gridFacade.settings$,
            this.listFacade.settings$,
        ])
            .pipe(first())
            .subscribe({
                next: ([
                    filterSettings,
                    pageSettings,
                    gridSettings,
                    listSettings,
                ]) => {
                    this.form.patchValue({
                        page: {
                            typeFilter: filterSettings.typeFilter,
                            viewMode: pageSettings.viewMode,
                        },
                        grid: {
                            showTitles: gridSettings.showTitles,
                            margin: gridSettings.margin,
                            thumbnailSize: gridSettings.thumbnailSize.name,
                        },
                        list: {
                            margin: listSettings.margin,
                            thumbnailSize: listSettings.thumbnailSize.name,
                        },
                    });
                },
            });
    }

    private readPageForm(): CategoryPageSettings {
        return {
            viewMode: toCategoryViewMode(
                this.form.get('page.viewMode')?.value
            ) as CategoryViewMode,
        };
    }

    private readGridForm(): CategoryGridViewSettings {
        return {
            showTitles: this.form.get('grid.showTitles')?.value as boolean,
            margin: this.form.get('grid.margin')?.value as Margin,
            thumbnailSize: ThumbnailSize.forName(
                this.form.get('grid.thumbnailSize')?.value
            ),
        };
    }

    private readListForm(): CategoryListViewSettings {
        return {
            margin: this.form.get('list.margin')?.value as Margin,
            thumbnailSize: ThumbnailSize.forName(
                this.form.get('list.thumbnailSize')?.value
            ),
        };
    }
}
