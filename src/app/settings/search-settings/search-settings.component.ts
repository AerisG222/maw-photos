import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchGridSettingsFacade } from '@core/facades/settings/search-grid-settings-facade';
import { SearchListSettingsFacade } from '@core/facades/settings/search-list-settings-facade';
import { SearchPageSettingsFacade } from '@core/facades/settings/search-page-settings-facade';

import { allCategoryViewModes, CategoryMargin, ThumbnailSize } from '@models';
import { combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';
import { SearchGridViewSettings } from '@models';
import { SearchListViewSettings } from '@models';
import { SearchPageSettings } from '@models';

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

    constructor(
        private fb: FormBuilder,
        private gridFacade: SearchGridSettingsFacade,
        private listFacade: SearchListSettingsFacade,
        private pageFacade: SearchPageSettingsFacade
    ) {
        this.form = this.fb.group({
            page: this.fb.group({
                viewMode: ''
            }),
            grid: this.fb.group({
                showTitles: '',
                showYears: '',
                margin: '',
                thumbnailSize: ''
            }),
            list: this.fb.group({
                margin: '',
                thumbnailSize: ''
            })
        });

        this.resetForm();
    }

    onSave() {
        if(!this.form.valid) {
            return;
        }

        const grid = this.readGridForm();
        const list = this.readListForm();
        const page = this.readPageForm();

        this.gridFacade.save(grid);
        this.listFacade.save(list);
        this.pageFacade.save(page);
    }

    onCancel() {
        this.resetForm();
    }

    private readGridForm(): SearchGridViewSettings {
        return {
            margin: CategoryMargin.forName(this.form.get('grid.margin')?.value),
            showTitles: this.form.get('grid.showTitles')?.value,
            showYears: this.form.get('grid.showYears')?.value,
            thumbnailSize: ThumbnailSize.forName(this.form.get('grid.thumbnailSize')?.value)
        };
    }

    private readListForm(): SearchListViewSettings {
        return {
            margin: CategoryMargin.forName(this.form.get('list.margin')?.value),
            thumbnailSize: ThumbnailSize.forName(this.form.get('list.thumbnailSize')?.value)
        };
    }

    private readPageForm(): SearchPageSettings {
        return {
            viewMode: this.form.get('page.viewMode')?.value
        };
    }

    private resetForm() {
        combineLatest([
            this.gridFacade.settings$,
            this.listFacade.settings$,
            this.pageFacade.settings$
        ]).pipe(
            first()
        ).subscribe({
            next: ([grid, list, page]) => {
                this.form.patchValue({
                    page: {
                        viewMode: page.viewMode
                    },
                    grid: {
                        showTitles: grid.showTitles,
                        showYears: grid.showYears,
                        margin: grid.margin.name,
                        thumbnailSize: grid.thumbnailSize.name
                    },
                    list: {
                        margin: list.margin.name,
                        thumbnailSize: list.thumbnailSize.name
                    }
                });
            }
        });
    }
}
