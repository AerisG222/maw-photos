import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { MatButton } from '@angular/material/button';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { tap, filter, map, take } from 'rxjs/operators';

import { sidebarShow, sidebarHide, sidebarInfoPanelShow, sidebarInfoPanelHide } from '../animations';
import { ExifData } from 'src/app/core/models/exif-data.model';
import { Photo } from 'src/app/core/models/photo.model';
import { Comment } from 'src/app/core/models/comment.model';
import { PhotoEffects } from 'src/app/core/models/photo-effects.model';
import { Rating } from 'src/app/core/models/rating.model';
import { CommentsComponent } from '../comments/comments.component';
import {
    PhotoStoreActions,
    PhotoStoreSelectors,
    RootStoreState,
    SettingsStoreActions,
    SettingsStoreSelectors
} from 'src/app/core/root-store';

// TODO: push the data fetch and api calls into their respective components

@Component({
    selector: 'app-photo-info-panel',
    templateUrl: './photo-info-panel.component.html',
    styleUrls: ['./photo-info-panel.component.scss'],
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
export class PhotoInfoPanelComponent implements OnInit, OnDestroy {
    private hotkeys: Hotkey[] = [];
    private destroySub = new Subscription();

    endSidenavExpanded$: Observable<boolean>;
    showComments$: Observable<boolean>;
    showEffects$: Observable<boolean>;
    showExif$: Observable<boolean>;
    showRatings$: Observable<boolean>;
    showMinimap$: Observable<boolean>;
    showHistogram$: Observable<boolean>;
    enableButtons$: Observable<boolean>;

    rating$: Observable<Rating>;
    comments$: Observable<Comment[]>;
    exif$: Observable<ExifData[]>;
    effects$: Observable<PhotoEffects>;
    latitude$: Observable<number>;
    longitude$: Observable<number>;
    minimapMapTypeId$: Observable<string>;
    minimapZoom$: Observable<number>;
    minimapUseDarkTheme$: Observable<boolean>;

    @ViewChild(CommentsComponent, {static: false}) comments: CommentsComponent;
    @ViewChild('toggleInfoPanelButton', {static: false}) toggleInfoPanelButton: MatButton;
    @ViewChild('toggleRatingsButton', {static: false}) toggleRatingsButton: MatButton;
    @ViewChild('toggleCommentsButton', {static: false}) toggleCommentsButton: MatButton;
    @ViewChild('toggleExifButton', {static: false}) toggleExifButton: MatButton;
    @ViewChild('toggleEffectsButton', {static: false}) toggleEffectsButton: MatButton;
    @ViewChild('toggleMinimapButton', {static: false}) toggleMinimapButton: MatButton;
    @ViewChild('toggleHistogramButton', {static: false}) toggleHistogramButton: MatButton;

    currentPhoto: Photo;

    constructor(
        private store$: Store<RootStoreState.State>,
        private hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.configureHotkeys();

        const currentPhoto$ = this.store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhoto),
            filter(photo => !!photo)
        );

        this.destroySub.add(currentPhoto$
            .pipe(
                tap(photo => this.currentPhoto = photo),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadRatingRequest({ photoId: photo.id }))),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadCommentsRequest({ photoId: photo.id }))),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadExifRequest({ photoId: photo.id })))
            ).subscribe()
        );

        this.enableButtons$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelExpandedState)
        );

        this.endSidenavExpanded$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelExpandedState)
        );

        this.showComments$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowComments)
        );

        this.showEffects$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowEffects)
        );

        this.showExif$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowExif)
        );

        this.showHistogram$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowHistogram)
        );

        this.showMinimap$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowMinimap)
        );

        this.minimapMapTypeId$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelMinimapMapTypeId)
        );

        this.minimapZoom$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelMinimapZoom)
        );

        this.minimapUseDarkTheme$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectAppTheme),
            map(theme => theme.isDark)
        );

        this.showRatings$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowRatings)
        );

        this.rating$ = this.store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoRating)
        );

        this.comments$ = this.store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoComments),
            tap(x => {
                if (this.comments) {
                    this.comments.saveSucceeded();
                }})
        );

        this.exif$ = this.store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoExifData)
        );

        this.latitude$ = currentPhoto$
            .pipe(
                map(photo => {
                    if (photo) {
                        return photo.latitude == null ? null : photo.latitude;
                    }

                    return null;
                })
            );

        this.longitude$ = currentPhoto$
            .pipe(
                map(photo => {
                    if (photo) {
                        return photo.longitude == null ? null : photo.longitude;
                    }

                    return null;
                })
            );

        this.effects$ = this.store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoEffects)
        );

        this.destroySub.add(currentPhoto$.subscribe());
    }

    ngOnDestroy() {
        this.hotkeysService.remove(this.hotkeys);
        this.destroySub.unsubscribe();
    }

    toggleEndSidenav(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelExpandedStateRequest());
    }

    onRate(userRating: number): void {
        if (this.currentPhoto) {
            this.store$.dispatch(PhotoStoreActions.ratePhotoRequest({ photoId: this.currentPhoto.id, userRating }));
        }
    }

    onComment(comment: string): void {
        if (this.currentPhoto) {
            this.store$.dispatch(PhotoStoreActions.addCommentRequest({ photoId: this.currentPhoto.id, comment }));
        }
    }

    onResetEffects(): void {
        if (this.currentPhoto) {
            this.store$.dispatch(PhotoStoreActions.resetEffectsRequest());
        }
    }

    onUpdateEffects(effects: PhotoEffects): void {
        if (this.currentPhoto) {
            this.store$.dispatch(PhotoStoreActions.updateEffectsRequest({ effects }));
        }
    }

    toggleRatings(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelRatingsRequest());
    }

    toggleComments(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelCommentsRequest());
    }

    toggleExif(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelExifRequest());
    }

    toggleHistogram(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelHistogramRequest());
    }

    toggleEffects(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelEffectsRequest());
    }

    toggleMinimap(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelMinimapRequest());
    }

    onMapTypeIdChange(mapTypeId: string): void {
        this.store$.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this.store$.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapZoomRequest({ zoom }));
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
            new Hotkey('w', (event: KeyboardEvent) => this.onHotkeyToggleExif(event), [], 'Show / Hide EXIF Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('h', (event: KeyboardEvent) => this.onHotkeyToggleHistogram(event), [], 'Show / Hide Histogram Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('e', (event: KeyboardEvent) => this.onHotkeyToggleEffects(event), [], 'Show / Hide Effects Panel')
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

    private onHotkeyToggleExif(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleExifButton);
        this.togglePanel(this.showExif$, () => this.toggleExif());

        return false;
    }

    private onHotkeyToggleHistogram(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleHistogramButton);
        this.togglePanel(this.showHistogram$, () => this.toggleHistogram());

        return false;
    }

    private onHotkeyToggleEffects(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleEffectsButton);
        this.togglePanel(this.showEffects$, () => this.toggleEffects());

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
