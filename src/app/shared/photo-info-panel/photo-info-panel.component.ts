import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap, filter, map } from 'rxjs/operators';

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

@Component({
    selector: 'app-photo-info-panel',
    templateUrl: './photo-info-panel.component.html',
    styleUrls: ['./photo-info-panel.component.scss']
})
export class PhotoInfoPanelComponent implements OnInit, OnDestroy {
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
        private _store$: Store<RootStoreState.State>
    ) { }

    ngOnInit() {
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
}
