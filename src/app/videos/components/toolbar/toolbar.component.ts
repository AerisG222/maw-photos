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
    selector: 'app-videos-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    isFirst$: Observable<boolean> | null = null;
    isLast$: Observable<boolean> | null = null;
    settings: Settings | null = null;

    constructor(private store$: Store) {

    }

    ngOnInit(): void {
        this.destroySub.add(this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings)
            ).subscribe()
        );

        this.isFirst$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectIsActiveVideoFirst)
            );

        this.isLast$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectIsActiveVideoLast)
            );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onToggleCategoryBreadcrumbs(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoListCategoryBreadcrumbsRequest());
    }

    onToggleThumbnailSize(): void {
        const sizeName = this.settings?.videoListThumbnailSize.name;

        if (!!sizeName) {
            const size = ThumbnailSize.nextSize(sizeName);

            this.store$.dispatch(SettingsStoreActions.updateVideoListThumbnailSizeRequest({ newSize: size }));
        }
    }

    onToggleShowVideoList(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoListShowVideoListRequest());
    }

    onToggleVideoSize(): void {
        const sizeName = this.settings?.videoListVideoSize.name;

        if (!!sizeName) {
            const size = VideoSize.nextSize(sizeName);

            this.store$.dispatch(SettingsStoreActions.updateVideoListVideoSizeRequest({ newSize: size }));
        }
    }

    onMovePrevious(): void {
        this.store$.dispatch(VideoStoreActions.movePreviousRequest());
    }

    onMoveNext(): void {
        this.store$.dispatch(VideoStoreActions.moveNextRequest());
    }
}
