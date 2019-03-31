import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, tap, filter, map, take } from 'rxjs/operators';

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
    SettingsStoreSelectors,
    LayoutStoreSelectors
} from 'src/app/core/root-store';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { MatButton } from '@angular/material';

@Component({
    selector: 'app-photo-info-panel',
    templateUrl: './photo-info-panel.component.html',
    styleUrls: ['./photo-info-panel.component.scss']
})
export class PhotoInfoPanelComponent implements OnInit, OnDestroy {
    private _hotkeys: Hotkey[] = [];

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

    @ViewChild(CommentsComponent) comments: CommentsComponent;
    @ViewChild('toggleInfoPanelButton') toggleInfoPanelButton: MatButton;
    @ViewChild('toggleRatingsButton') toggleRatingsButton: MatButton;
    @ViewChild('toggleCommentsButton') toggleCommentsButton: MatButton;
    @ViewChild('toggleExifButton') toggleExifButton: MatButton;
    @ViewChild('toggleEffectsButton') toggleEffectsButton: MatButton;
    @ViewChild('toggleMinimapButton') toggleMinimapButton: MatButton;
    @ViewChild('toggleHistogramButton') toggleHistogramButton: MatButton;

    currentPhoto: Photo;
    private destroy$ = new Subject<boolean>();

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.configureHotkeys();

        const currentPhoto$ = this._store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhoto),
            filter(photo => !!photo),
            takeUntil(this.destroy$)
        );

        currentPhoto$
            .pipe(
                tap(photo => this.currentPhoto = photo),
                tap(photo => this._store$.dispatch(new PhotoStoreActions.LoadRatingRequestAction({ photoId: photo.id }))),
                tap(photo => this._store$.dispatch(new PhotoStoreActions.LoadCommentsRequestAction({ photoId: photo.id }))),
                tap(photo => this._store$.dispatch(new PhotoStoreActions.LoadExifRequestAction({ photoId: photo.id }))),
                takeUntil(this.destroy$)
            ).subscribe();

        this.enableButtons$ = combineLatest(
            this._store$.pipe( select(SettingsStoreSelectors.selectPhotoInfoPanelExpandedState) ),
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
            select(SettingsStoreSelectors.selectPhotoInfoPanelExpandedState)
        );

        this.showComments$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowComments)
        );

        this.showEffects$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowEffects)
        );

        this.showExif$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowExif)
        );

        this.showHistogram$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowHistogram)
        );

        this.showMinimap$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowMinimap)
        );

        this.minimapMapTypeId$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelMinimapMapTypeId)
        );

        this.minimapZoom$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelMinimapZoom)
        );

        this.minimapUseDarkTheme$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectAppTheme),
            map(theme => theme.isDark)
        );

        this.showRatings$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowRatings)
        );

        this.rating$ = this._store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoRating)
        );

        this.comments$ = this._store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoComments),
            tap(x => {
                if (this.comments) {
                    this.comments.saveSucceeded();
                }})
        );

        this.exif$ = this._store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoExifData)
        );

        this.latitude$ = currentPhoto$
            .pipe(
                map(photo => {
                    if (photo) {
                        return photo.latitude == null ? null : photo.latitude;
                    }

                    return null;
                }),
                takeUntil(this.destroy$)
            );

        this.longitude$ = currentPhoto$
            .pipe(
                map(photo => {
                    if (photo) {
                        return photo.longitude == null ? null : photo.longitude;
                    }

                    return null;
                }),
                takeUntil(this.destroy$)
            );

        this.effects$ = this._store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoEffects)
        );

        currentPhoto$.subscribe();
    }

    ngOnDestroy() {
        this._hotkeysService.remove(this._hotkeys);
        this.destroy$.next(true);
    }

    toggleEndSidenav(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoInfoPanelExpandedStateRequestAction());
    }

    onRate(userRating: number): void {
        if (this.currentPhoto) {
            this._store$.dispatch(new PhotoStoreActions.RatePhotoRequestAction({ photoId: this.currentPhoto.id, userRating: userRating }));
        }
    }

    onComment(comment: string): void {
        if (this.currentPhoto) {
            this._store$.dispatch(new PhotoStoreActions.AddCommentRequestAction({ photoId: this.currentPhoto.id, comment: comment }));
        }
    }

    onResetEffects(): void {
        if (this.currentPhoto) {
            this._store$.dispatch(new PhotoStoreActions.ResetEffectsRequestAction());
        }
    }

    onUpdateEffects(effects: PhotoEffects): void {
        if (this.currentPhoto) {
            this._store$.dispatch(new PhotoStoreActions.UpdateEffectsRequestAction({ effects: effects }));
        }
    }

    toggleRatings(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoInfoPanelRatingsRequestAction());
    }

    toggleComments(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoInfoPanelCommentsRequestAction());
    }

    toggleExif(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoInfoPanelExifRequestAction());
    }

    toggleHistogram(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoInfoPanelHistogramRequestAction());
    }

    toggleEffects(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoInfoPanelEffectsRequestAction());
    }

    toggleMinimap(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoInfoPanelMinimapRequestAction());
    }

    onMapTypeIdChange(mapTypeId: string): void {
        this._store$.dispatch(new SettingsStoreActions.UpdatePhotoInfoPanelMinimapMapTypeIdRequestAction({ mapTypeId: mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this._store$.dispatch(new SettingsStoreActions.UpdatePhotoInfoPanelMinimapZoomRequestAction({ zoom: zoom }));
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
            new Hotkey('w', (event: KeyboardEvent) => this.onHotkeyToggleExif(event), [], 'Show / Hide EXIF Panel')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('h', (event: KeyboardEvent) => this.onHotkeyToggleHistogram(event), [], 'Show / Hide Histogram Panel')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('e', (event: KeyboardEvent) => this.onHotkeyToggleEffects(event), [], 'Show / Hide Effects Panel')
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
