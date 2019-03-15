import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { map, flatMap, tap, takeUntil, take, filter } from 'rxjs/operators';

import { VideoCategory } from 'src/app/core/models/video-category.model';
import { Video } from 'src/app/core/models/video.model';
import { Settings } from 'src/app/core/models/settings.model';
import {
    LayoutStoreActions,
    RootStoreState,
    SettingsStoreActions,
    SettingsStoreSelectors,
    VideoCategoryStoreActions,
    VideoCategoryStoreSelectors,
    VideoStoreActions,
    VideoStoreSelectors
} from 'src/app/core/root-store';
import { VideoSize } from 'src/app/core/models/video-size.model';

@Component({
    selector: 'app-video-category',
    templateUrl: './video-category.component.html',
    styleUrls: ['./video-category.component.scss']
})
export class VideoCategoryComponent implements OnInit, OnDestroy {
    videoSize = VideoSize;
    showCategoryAsLink = false;
    destroy$ = new Subject<boolean>();
    settings$: Observable<Settings>;
    category$: Observable<VideoCategory>;
    videos$: Observable<Video[]>;
    activeVideo$: Observable<Video>;

    constructor(
        private _route: ActivatedRoute,
        private _store$: Store<RootStoreState.State>
    ) { }

    ngOnInit() {
        this.settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            );

        this.category$ = this._store$
            .pipe(
                select(VideoCategoryStoreSelectors.selectCurrentCategory),
            );

        this.videos$ = this._store$
            .pipe(
                select(VideoStoreSelectors.selectAllVideos),
                tap(videos => this.setCurrentVideo(videos[0]))
            );

        this.activeVideo$ = this._store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                filter(x => !!x)
            );

        this._store$.dispatch(new VideoStoreActions.ClearRequestAction());
        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());
        this._store$.dispatch(new LayoutStoreActions.OpenRightSidebarRequestAction());

        this._route.params
            .pipe(
                map(p => Number(p.id)),
                tap(id => this._store$.dispatch(new VideoCategoryStoreActions.SetCurrentByIdAction({ categoryId: id }))),
                tap(id => this._store$.dispatch(new VideoStoreActions.LoadRequestAction({ categoryId: id }))),
                takeUntil(this.destroy$)
            ).subscribe();
    }

    ngOnDestroy(): void {
        this._store$.dispatch(new LayoutStoreActions.CloseRightSidebarRequestAction());
        this.destroy$.next(true);
        this.setCurrentVideo(null);
    }

    onSelectVideo(video: Video): void {
        this.setCurrentVideo(video);
    }

    private setCurrentVideo(video: Video): void {
        this._store$.dispatch(new VideoStoreActions.SetCurrentAction({ video: video }));
    }
}
