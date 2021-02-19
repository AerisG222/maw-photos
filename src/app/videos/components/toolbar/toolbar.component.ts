import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Settings } from '@models';
import { VideoDetailSettingsFacade } from '@core/facades/settings/video-detail-settings-facade';

@Component({
    selector: 'app-videos-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
    settings: Settings | null = null;

    constructor(private videoFacade: VideoDetailSettingsFacade) {}

    onToggleCategoryBreadcrumbs(): void {
        this.videoFacade.toggleBreadcrumbs();
    }

    onToggleThumbnailSize(): void {
        this.videoFacade.toggleThumbnailSize();
    }

    onToggleShowVideoList(): void {
        this.videoFacade.toggleShowVideoList();
    }

    onToggleVideoSize(): void {
        this.videoFacade.toggleVideoSize();
    }
}
