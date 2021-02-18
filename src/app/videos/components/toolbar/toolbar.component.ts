import {
    Component,
    OnInit,
    OnDestroy,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Settings, ThumbnailSize, VideoSize } from '@models';
import { VideoStoreActions } from 'src/app/videos/store';
import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { VideoDetailSettingsFacade } from '@core/facades/settings/video-detail-settings-facade';

@Component({
    selector: 'app-videos-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit, OnDestroy {
    settings: Settings | null = null;

    private destroySub = new Subscription();

    constructor(
        private store: Store,
        private videoFacade: VideoDetailSettingsFacade
    ) {}

    ngOnInit(): void {
        this.destroySub.add(
            this.store
                .select(SettingsStoreSelectors.settings)
                .pipe(tap((settings) => (this.settings = settings)))
                .subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

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
