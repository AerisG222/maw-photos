import { Component, ChangeDetectionStrategy } from '@angular/core';

import { SearchGridSettingsFacade } from '@core/facades/settings/search-grid-settings-facade';

@Component({
    selector: 'app-grid-toolbar',
    templateUrl: './grid-toolbar.component.html',
    styleUrls: ['./grid-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridToolbarComponent {
    gridSettings$ = this.gridSettings.settings$;

    constructor(private gridSettings: SearchGridSettingsFacade) { }

    onToggleMargins(): void {
        this.gridSettings.toggleMargins();
    }

    onToggleThumbnailSize(): void {
        this.gridSettings.toggleThumbnailSize();
    }

    onToggleTitle(): void {
        this.gridSettings.toggleTitles();
    }

    onToggleYear(): void {
        this.gridSettings.toggleYears();
    }
}
