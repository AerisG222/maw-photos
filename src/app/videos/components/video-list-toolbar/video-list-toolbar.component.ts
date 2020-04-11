import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { Settings } from 'src/app/models/settings.model';
import { VideoSize } from 'src/app/models/video-size.model';
import { VideoStoreActions, VideoStoreSelectors } from 'src/app/videos/store';
import { SettingsStoreActions, SettingsStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-video-list-toolbar',
    templateUrl: './video-list-toolbar.component.html',
    styleUrls: ['./video-list-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListToolbarComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    isFirst$: Observable<boolean>;
    isLast$: Observable<boolean>;
    settings: Settings;

    constructor(
        private store$: Store
    ) { }

    ngOnInit() {
        this.destroySub.add(this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings)
            ).subscribe()
        );

        this.isFirst$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectIsCurrentVideoFirst)
            );

        this.isLast$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectIsCurrentVideoLast)
            );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onToggleCategoryBreadcrumbs(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoListCategoryBreadcrumbsRequest());
    }

    onToggleThumbnailSize(): void {
        const size = ThumbnailSize.nextSize(this.settings.videoListThumbnailSize.name);

        this.store$.dispatch(SettingsStoreActions.updateVideoListThumbnailSizeRequest({ newSize: size }));
    }

    onToggleShowVideoList(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoListShowVideoListRequest());
    }

    onToggleVideoSize(): void {
        const size = VideoSize.nextSize(this.settings.videoListVideoSize.name);

        this.store$.dispatch(SettingsStoreActions.updateVideoListVideoSizeRequest({ newSize: size }));
    }

    onMovePrevious(): void {
        this.store$.dispatch(VideoStoreActions.movePreviousRequest());
    }

    onMoveNext(): void {
        this.store$.dispatch(VideoStoreActions.moveNextRequest());
    }
}
