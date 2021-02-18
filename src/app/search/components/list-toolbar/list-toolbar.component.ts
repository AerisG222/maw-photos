import { Component, ChangeDetectionStrategy } from '@angular/core';

import { SearchListSettingsFacade } from '@core/facades/settings/search-list-settings-facade';

@Component({
    selector: 'app-list-toolbar',
    templateUrl: './list-toolbar.component.html',
    styleUrls: ['./list-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListToolbarComponent {
    constructor(private listSettings: SearchListSettingsFacade) {}

    onToggleThumbnailSize(): void {
        this.listSettings.toggleThumbnailSize();
    }

    onToggleMargins(): void {
        this.listSettings.toggleMargins();
    }
}
