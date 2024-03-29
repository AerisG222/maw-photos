import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SearchGridSettingsFacade } from '@core/facades/settings/search-grid-settings-facade';
import { SearchListSettingsFacade } from '@core/facades/settings/search-list-settings-facade';
import { SearchPageSettingsFacade } from '@core/facades/settings/search-page-settings-facade';

import {
    allCategoryViewModes,
    allMargins,
    allThumbnailSizes,
    CategoryViewMode,
    toMarginDefaulted,
    toThumbnailSizeDefaulted,
} from '@models';
import { combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';
import { SearchGridViewSettings } from '@models';
import { SearchListViewSettings } from '@models';
import { SearchPageSettings } from '@models';

@Component({
    selector: 'app-search-settings',
    templateUrl: './search-settings.component.html',
    styleUrls: ['./search-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSettingsComponent {
    form: UntypedFormGroup;
    margins = allMargins;
    viewModes = allCategoryViewModes;
    thumbnailSizes = allThumbnailSizes;

    constructor(
        private fb: UntypedFormBuilder,
        private gridFacade: SearchGridSettingsFacade,
        private listFacade: SearchListSettingsFacade,
        private pageFacade: SearchPageSettingsFacade
    ) {
        this.form = this.fb.group({
            page: this.fb.group({
                viewMode: '',
            }),
            grid: this.fb.group({
                showTitles: '',
                showYears: '',
                margin: '',
                thumbnailSize: '',
            }),
            list: this.fb.group({
                margin: '',
                thumbnailSize: '',
            }),
        });

        this.resetForm();
    }

    onSave(): void {
        if (!this.form.valid) {
            return;
        }

        const grid = this.readGridForm();
        const list = this.readListForm();
        const page = this.readPageForm();

        this.gridFacade.save(grid);
        this.listFacade.save(list);
        this.pageFacade.save(page);
    }

    onCancel(): void {
        this.resetForm();
    }

    private readGridForm(): SearchGridViewSettings {
        return {
            margin: toMarginDefaulted(this.form.get('grid.margin')?.value as string),
            showTitles: this.form.get('grid.showTitles')?.value as boolean,
            showYears: this.form.get('grid.showYears')?.value as boolean,
            thumbnailSize: toThumbnailSizeDefaulted(
                this.form.get('grid.thumbnailSize')?.value as string
            ),
        };
    }

    private readListForm(): SearchListViewSettings {
        return {
            margin: toMarginDefaulted(this.form.get('list.margin')?.value as string),
            thumbnailSize: toThumbnailSizeDefaulted(
                this.form.get('list.thumbnailSize')?.value as string
            ),
        };
    }

    private readPageForm(): SearchPageSettings {
        return {
            viewMode: this.form.get('page.viewMode')?.value as CategoryViewMode,
        };
    }

    private resetForm() {
        combineLatest([
            this.gridFacade.settings$,
            this.listFacade.settings$,
            this.pageFacade.settings$,
        ])
            .pipe(first())
            .subscribe({
                next: ([grid, list, page]) => {
                    this.form.patchValue({
                        page: {
                            viewMode: page.viewMode,
                        },
                        grid: {
                            showTitles: grid.showTitles,
                            showYears: grid.showYears,
                            margin: grid.margin,
                            thumbnailSize: grid.thumbnailSize,
                        },
                        list: {
                            margin: list.margin,
                            thumbnailSize: list.thumbnailSize,
                        },
                    });
                },
            });
    }
}
