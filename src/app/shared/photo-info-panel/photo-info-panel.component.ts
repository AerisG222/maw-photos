import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, tap, filter, map, first, take } from 'rxjs/operators';

import { ExifData } from 'src/app/core/models/exif-data.model';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoComment } from 'src/app/core/models/photo-comment.model';
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
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

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

    rating$: Observable<Rating>;
    comments$: Observable<PhotoComment[]>;
    exif$: Observable<ExifData[]>;
    effects$: Observable<PhotoEffects>;
    latitude$: Observable<number>;
    longitude$: Observable<number>;

    @ViewChild(CommentsComponent) comments: CommentsComponent;

    private currentPhoto: Photo;
    private destroy$ = new Subject<boolean>();

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.configureHotkeys();

        const currentPhoto$ = this._store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhoto),
            filter(photo => photo !== null),
            tap(photo => this.currentPhoto = photo),
            tap(photo => this._store$.dispatch(new PhotoStoreActions.LoadRatingRequestAction({ photoId: photo.id }))),
            tap(photo => this._store$.dispatch(new PhotoStoreActions.LoadCommentsRequestAction({ photoId: photo.id }))),
            tap(photo => this._store$.dispatch(new PhotoStoreActions.LoadExifRequestAction({ photoId: photo.id }))),
            takeUntil(this.destroy$)
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

        this.showMinimap$ = this._store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowMinimap)
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

        this.latitude$ = this._store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoExifData),
            map(d => {
                if (d) {
                    const lat = d.find(x => x.sourceField === 'gpsLatitude');

                    return lat == null ? null : lat.sourceValue;
                }

                return null;
            })
        );

        this.longitude$ = this._store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoExifData),
            map(d => {
                if (d) {
                    const lng = d.find(x => x.sourceField === 'gpsLongitude');

                    return lng == null ? null : lng.sourceValue;
                }

                return null;
            })
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

    toggleEffects(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoInfoPanelEffectsRequestAction());
    }

    toggleMinimap(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoInfoPanelMinimapRequestAction());
    }

    private configureHotkeys(): void {
        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('i', (event: KeyboardEvent) => this.onHotkeyToggleEndSidenav(event))
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('r', (event: KeyboardEvent) => this.onHotkeyToggleRatings(event))
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('c', (event: KeyboardEvent) => this.onHotkeyToggleComments(event))
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('w', (event: KeyboardEvent) => this.onHotkeyToggleExif(event))
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('e', (event: KeyboardEvent) => this.onHotkeyToggleEffects(event))
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('m', (event: KeyboardEvent) => this.onHotkeyToggleMinimap(event))
        ));
    }

    private onHotkeyToggleEndSidenav(evt: KeyboardEvent): boolean {
        this.toggleEndSidenav();

        return false;
    }

    private onHotkeyToggleRatings(evt: KeyboardEvent): boolean {
        this.togglePanel(this.showRatings$, () => this.toggleRatings());

        return false;
    }

    private onHotkeyToggleComments(evt: KeyboardEvent): boolean {
        this.togglePanel(this.showComments$, () => this.toggleComments());

        return false;
    }

    private onHotkeyToggleExif(evt: KeyboardEvent): boolean {
        this.togglePanel(this.showExif$, () => this.toggleExif());

        return false;
    }

    private onHotkeyToggleEffects(evt: KeyboardEvent): boolean {
        this.togglePanel(this.showEffects$, () => this.toggleEffects());

        return false;
    }

    private onHotkeyToggleMinimap(evt: KeyboardEvent): boolean {
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
}
