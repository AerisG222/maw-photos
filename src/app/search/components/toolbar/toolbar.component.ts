import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';

import { RouteHelper } from '@models';
import { SearchPageSettingsFacade } from '@core/facades/settings/search-page-settings-facade';
import { SearchGridSettingsFacade } from '@core/facades/settings/search-grid-settings-facade';
import { SearchListSettingsFacade } from '@core/facades/settings/search-list-settings-facade';

@Component({
    selector: 'app-search-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
    isListView$ = this.pageSettings.settings$.pipe(map(x => x.viewMode === RouteHelper.searchViewList));
    isGridView$ = this.pageSettings.settings$.pipe(map(x => x.viewMode === RouteHelper.searchViewGrid));
    gridSettings$ = this.gridSettings.settings$;

    // TODO: break out separate components for grid and list toolbars
    constructor(
        private pageSettings: SearchPageSettingsFacade,
        private gridSettings: SearchGridSettingsFacade,
        private listSettings: SearchListSettingsFacade
    ) {

    }

    onToggleYear(): void {
        this.gridSettings.toggleYears();
    }

    onToggleTitle(): void {
        this.gridSettings.toggleTitles();
    }

    onToggleListThumbnailSize(): void {
        this.listSettings.toggleThumbnailSize();
    }

    onToggleGridThumbnailSize(): void {
        this.gridSettings.toggleThumbnailSize();
    }

    onToggleGridMargins(): void {
        this.gridSettings.toggleMargins();
    }

    onToggleListMargins(): void {
        this.listSettings.toggleMargins();
    }
}
