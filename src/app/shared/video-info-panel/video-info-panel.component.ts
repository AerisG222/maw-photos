import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { transition, useAnimation, trigger } from '@angular/animations';

import { sidebarShow, sidebarHide, sidebarInfoPanelShow, sidebarInfoPanelHide } from '../animations';
import { Video } from 'src/app/core/models/video.model';
import { CommentMode } from '../comments/comment-mode.model';
import { RatingMode } from '../rating/rating-mode.model';
import {
    RootStoreState,
    SettingsStoreActions,
    SettingsStoreSelectors,
    VideoStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-video-info-panel',
    templateUrl: './video-info-panel.component.html',
    styleUrls: ['./video-info-panel.component.scss'],
    animations: [
        trigger('sidebarFlyInOut', [
            transition(':enter', [
                useAnimation(sidebarShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarHide)
            ])
        ]),
        trigger('toggleInfoPanel', [
            transition(':enter', [
                useAnimation(sidebarInfoPanelShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarInfoPanelHide)
            ])
        ])
    ]
})
export class VideoInfoPanelComponent implements OnInit, OnDestroy {
    private hotkeys: Hotkey[] = [];
    private destroySub = new Subscription();

    commentMode: CommentMode;
    ratingMode = RatingMode;

    endSidenavExpanded$: Observable<boolean>;
    showComments$: Observable<boolean>;
    showRatings$: Observable<boolean>;
    showMinimap$: Observable<boolean>;
    minimapUseDarkTheme$: Observable<boolean>;
    enableButtons$: Observable<boolean>;

    latitude$: Observable<number>;
    longitude$: Observable<number>;
    minimapMapTypeId$: Observable<string>;
    minimapZoom$: Observable<number>;

    @ViewChild('toggleInfoPanelButton', {static: false}) toggleInfoPanelButton: MatButton;
    @ViewChild('toggleRatingsButton', {static: false}) toggleRatingsButton: MatButton;
    @ViewChild('toggleCommentsButton', {static: false}) toggleCommentsButton: MatButton;
    @ViewChild('toggleMinimapButton', {static: false}) toggleMinimapButton: MatButton;

    constructor(
        private store$: Store<RootStoreState.State>,
        private hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.configureHotkeys();

        const currentVideo$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                filter(video => !!video)
            );

        this.enableButtons$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelExpandedState)
        );

        this.endSidenavExpanded$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelExpandedState)
        );

        this.showComments$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowComments)
        );

        this.showMinimap$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowMinimap)
        );

        this.minimapUseDarkTheme$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectAppTheme),
            map(theme => theme.isDark)
        );

        this.minimapMapTypeId$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelMinimapMapTypeId)
        );

        this.minimapZoom$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelMinimapZoom)
        );

        this.showRatings$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowRatings)
        );

        this.latitude$ = currentVideo$
            .pipe(
                map(video => {
                    if (video) {
                        return video.latitude == null ? null : video.latitude;
                    }

                    return null;
                })
            );

        this.longitude$ = currentVideo$
            .pipe(
                map(video => {
                    if (video) {
                        return video.longitude == null ? null : video.longitude;
                    }

                    return null;
                })
            );

        this.destroySub.add(currentVideo$.subscribe());
    }

    ngOnDestroy() {
        this.hotkeysService.remove(this.hotkeys);
        this.destroySub.unsubscribe();
    }

    toggleEndSidenav(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelExpandedStateRequest());
    }

    toggleRatings(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelRatingsRequest());
    }

    toggleComments(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelCommentsRequest());
    }

    toggleMinimap(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelMinimapRequest());
    }

    onMapTypeIdChange(mapTypeId: string): void {
        this.store$.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this.store$.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapZoomRequest({ zoom }));
    }

    private configureHotkeys(): void {
        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('i', (event: KeyboardEvent) => this.onHotkeyToggleEndSidenav(event), [], 'Show / Hide Info Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('r', (event: KeyboardEvent) => this.onHotkeyToggleRatings(event), [], 'Show / Hide Ratings Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('c', (event: KeyboardEvent) => this.onHotkeyToggleComments(event), [], 'Show / Hide Comments Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('m', (event: KeyboardEvent) => this.onHotkeyToggleMinimap(event), [], 'Show / Hide Minimap')
        ) as Hotkey);
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
        combineLatest([
            this.endSidenavExpanded$,
            showPanel$
        ]).pipe(
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
