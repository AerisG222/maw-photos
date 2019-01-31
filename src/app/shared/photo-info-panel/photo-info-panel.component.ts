import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { RootStoreState } from 'src/app/core/root-store';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/core/root-store/photo-store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';
import { Rating } from 'src/app/core/models/rating.model';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoComment } from 'src/app/core/models/photo-comment.model';
import { CommentsComponent } from '../comments/comments.component';
import { ExifDetail } from 'src/app/core/models/exif-detail.model';

@Component({
    selector: 'app-photo-info-panel',
    templateUrl: './photo-info-panel.component.html',
    styleUrls: ['./photo-info-panel.component.scss']
})
export class PhotoInfoPanelComponent implements OnInit, OnDestroy {
    endSidenavExpanded = false;
    rating$: Observable<Rating>;
    comments$: Observable<PhotoComment[]>;
    exif$: Observable<ExifDetail>;

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

        currentPhoto$.subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }

    toggleEndSidenav(): void {
        this.endSidenavExpanded = !this.endSidenavExpanded;
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

    rotateClockwise(): void {
        if (this.currentPhoto) {
            this._store$.dispatch(new PhotoStoreActions.RotateClockwiseRequestAction());
        }
    }

    rotateCounterClockwise(): void {
        if (this.currentPhoto) {
            this._store$.dispatch(new PhotoStoreActions.RotateCounterClockwiseRequestAction());
        }
    }
}
