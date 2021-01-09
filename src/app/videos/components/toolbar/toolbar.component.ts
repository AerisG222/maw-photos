import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Settings, ThumbnailSize, VideoSize } from '@models';
import { VideoStoreActions } from 'src/app/videos/store';
import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-videos-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {
    settings: Settings | null = null;

    private destroySub = new Subscription();

    constructor(private store: Store) {

    }

    ngOnInit(): void {
        this.destroySub.add(this.store
            .select(SettingsStoreSelectors.settings)
            .pipe(
                tap(settings => this.settings = settings)
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onToggleCategoryBreadcrumbs(): void {
        this.store.dispatch(SettingsStoreActions.toggleVideoListCategoryBreadcrumbsRequest());
    }

    onToggleThumbnailSize(): void {
        const sizeName = this.settings?.videoListThumbnailSize.name;

        if (!!sizeName) {
            const size = ThumbnailSize.nextSize(sizeName);

            this.store.dispatch(SettingsStoreActions.updateVideoListThumbnailSizeRequest({ newSize: size }));
        }
    }

    onToggleShowVideoList(): void {
        this.store.dispatch(SettingsStoreActions.toggleVideoListShowVideoListRequest());
    }

    onToggleVideoSize(): void {
        const sizeName = this.settings?.videoListVideoSize.name;

        if (!!sizeName) {
            const size = VideoSize.nextSize(sizeName);

            this.store.dispatch(SettingsStoreActions.updateVideoListVideoSizeRequest({ newSize: size }));
        }
    }
}
