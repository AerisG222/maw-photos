import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, Subject } from 'rxjs';
import { filter, take, map, tap, takeUntil } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { Comment } from 'src/app/core/models/comment.model';
import { Rating } from 'src/app/core/models/rating.model';
import { CommentsComponent } from '../comments/comments.component';
import { Video } from 'src/app/core/models/video.model';
import {
    RootStoreState,
    SettingsStoreActions,
    SettingsStoreSelectors,
    VideoStoreSelectors,
    VideoStoreActions,
    LayoutStoreSelectors,
} from 'src/app/core/root-store';

@Component({
    selector: 'app-video-info-panel',
    templateUrl: './video-info-panel.component.html',
    styleUrls: ['./video-info-panel.component.scss']
})
export class VideoInfoPanelComponent implements OnInit, OnDestroy {
    private _hotkeys: Hotkey[] = [];

    endSidenavExpanded$: Observable<boolean>;
    showComments$: Observable<boolean>;
    showRatings$: Observable<boolean>;
    showMinimap$: Observable<boolean>;
    minimapUseDarkTheme$: Observable<boolean>;
    enableButtons$: Observable<boolean>;

    rating$: Observable<Rating>;
    comments$: Observable<Comment[]>;
    latitude$: Observable<number>;
    longitude$: Observable<number>;
    minimapMapTypeId$: Observable<string>;
    minimapZoom$: Observable<number>;

    @ViewChild(CommentsComponent) comments: CommentsComponent;
    @ViewChild('toggleInfoPanelButton') toggleInfoPanelButton: MatButton;
    @ViewChild('toggleRatingsButton') toggleRatingsButton: MatButton;
    @ViewChild('toggleCommentsButton') toggleCommentsButton: MatButton;
    @ViewChild('toggleMinimapButton') toggleMinimapButton: MatButton;

    private currentVideo: Video;
    private destroy$ = new Subject<boolean>();

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.configureHotkeys();

        const currentVideo$ = this._store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                filter(video => !!video),
                takeUntil(this.destroy$)
            );

        currentVideo$
            .pipe(
                tap(video => this.currentVideo = video),
                tap(video => this._store$.dispatch(new VideoStoreActions.LoadRatingRequestAction({ videoId: video.id }))),
                tap(video => this._store$.dispatch(new VideoStoreActions.LoadCommentsRequestAction({ videoId: video.id }))),
                takeUntil(this.destroy$)
            ).subscribe();

        this.enableButtons$ = combineLatest(
                this._store$.pipe( select(SettingsStoreSelectors.selectVideoInfoPanelExpandedState) ),
                this._store$.pipe( select(LayoutStoreSelectors.selectLayoutIsMobileView) )
            ).pipe(
                map(x => ({ isExpanded: x[0], isMobile: x[1]})),
                map(x => {
                    if (x.isMobile  || x.isExpanded) {
                        return true;
                    }

                    return false;
                })
            );

        this.endSidenavExpanded$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelExpandedState)
        );

        this.showComments$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowComments)
        );

        this.showMinimap$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowMinimap)
        );

        this.minimapUseDarkTheme$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectAppTheme),
            map(theme => theme.isDark)
        );

        this.minimapMapTypeId$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelMinimapMapTypeId)
        );

        this.minimapZoom$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelMinimapZoom)
        );

        this.showRatings$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowRatings)
        );

        this.rating$ = this._store$.pipe(
            select(VideoStoreSelectors.selectCurrentVideoRating)
        );

        this.comments$ = this._store$.pipe(
            select(VideoStoreSelectors.selectCurrentVideoComments),
            tap(x => {
                if (this.comments) {
                    this.comments.saveSucceeded();
                }})
        );

        this.latitude$ = currentVideo$
            .pipe(
                map(video => {
                    if (video) {
                        return video.latitude == null ? null : video.latitude;
                    }

                    return null;
                }),
                takeUntil(this.destroy$)
            );

        this.longitude$ = currentVideo$
            .pipe(
                map(video => {
                    if (video) {
                        return video.longitude == null ? null : video.longitude;
                    }

                    return null;
                }),
                takeUntil(this.destroy$)
            );

        currentVideo$.subscribe();
    }

    ngOnDestroy() {
        this._hotkeysService.remove(this._hotkeys);
        this.destroy$.next(true);
    }

    toggleEndSidenav(): void {
        this._store$.dispatch(new SettingsStoreActions.ToggleVideoInfoPanelExpandedStateRequestAction());
    }

    onRate(userRating: number): void {
        if (this.currentVideo) {
            this._store$.dispatch(new VideoStoreActions.RateVideoRequestAction({ videoId: this.currentVideo.id, userRating: userRating }));
        }
    }

    onComment(comment: string): void {
        if (this.currentVideo) {
            this._store$.dispatch(new VideoStoreActions.AddCommentRequestAction({ videoId: this.currentVideo.id, comment: comment }));
        }
    }

    toggleRatings(): void {
        this._store$.dispatch(new SettingsStoreActions.ToggleVideoInfoPanelRatingsRequestAction());
    }

    toggleComments(): void {
        this._store$.dispatch(new SettingsStoreActions.ToggleVideoInfoPanelCommentsRequestAction());
    }

    toggleMinimap(): void {
        this._store$.dispatch(new SettingsStoreActions.ToggleVideoInfoPanelMinimapRequestAction());
    }

    onMapTypeIdChange(mapTypeId: string): void {
        this._store$.dispatch(new SettingsStoreActions.UpdateVideoInfoPanelMinimapMapTypeIdRequestAction({ mapTypeId: mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this._store$.dispatch(new SettingsStoreActions.UpdateVideoInfoPanelMinimapZoomRequestAction({ zoom: zoom }));
    }

    private configureHotkeys(): void {
        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('i', (event: KeyboardEvent) => this.onHotkeyToggleEndSidenav(event), [], 'Show / Hide Info Panel')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('r', (event: KeyboardEvent) => this.onHotkeyToggleRatings(event), [], 'Show / Hide Ratings Panel')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('c', (event: KeyboardEvent) => this.onHotkeyToggleComments(event), [], 'Show / Hide Comments Panel')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('m', (event: KeyboardEvent) => this.onHotkeyToggleMinimap(event), [], 'Show / Hide Minimap')
        ));
    }

    private onHotkeyToggleEndSidenav(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleInfoPanelButton);
        this.toggleEndSidenav();

        return false;
    }

    private onHotkeyToggleRatings(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleRatingsButton);
        this.togglePanel(this.showRatings$, () => this.toggleRatings());

        return false;
    }

    private onHotkeyToggleComments(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleCommentsButton);
        this.togglePanel(this.showComments$, () => this.toggleComments());

        return false;
    }

    private onHotkeyToggleMinimap(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleMinimapButton);
        this.togglePanel(this.showMinimap$, () => this.toggleMinimap());

        return false;
    }

    private togglePanel(showPanel$: Observable<boolean>, toggleFunc: () => void): void {
        combineLatest(
            this.endSidenavExpanded$,
            showPanel$
        ).pipe(
            filter(x => x[0] != null && x[1] != null),
            take(1),
            map(x => {
                if (!x[0]) {
                    // show info panel if hidden
                    this.toggleEndSidenav();

                    if (!x[1]) {
                        // if detail panel hidden, make sure we show this too
                        toggleFunc();
                    }
                } else {
                    toggleFunc();
                }
            })
        ).subscribe();
    }

    private triggerButtonRipple(button: MatButton) {
        if (button && !button.disabled) {
            button.ripple.launch({ centered: true });
        }
    }
}
