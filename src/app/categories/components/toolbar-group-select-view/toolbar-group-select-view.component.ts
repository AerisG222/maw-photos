import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CategoryPageSettingsFacade } from '@core/facades/settings/category-page-settings-facade';

@Component({
    selector: 'app-toolbar-group-select-view',
    templateUrl: './toolbar-group-select-view.component.html',
    styleUrls: ['./toolbar-group-select-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarGroupSelectViewComponent {
    constructor(private pageFacade: CategoryPageSettingsFacade) {}

    onSelectGridView(): void {
        this.pageFacade.selectGridView();
    }

    onSelectListView(): void {
        this.pageFacade.selectListView();
    }
}
