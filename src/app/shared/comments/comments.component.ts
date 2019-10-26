import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { CommentMode } from './comment-mode.model';
import { Comment } from 'src/app/core/models/comment.model';
import { RootStoreState, PhotoStoreSelectors, PhotoStoreActions, VideoStoreSelectors, VideoStoreActions } from 'src/app/core/root-store';
import { filter, tap } from 'rxjs/operators';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
    @Input() mode: CommentMode;

    private currentId = -1;
    private destroySub = new Subscription();
    comments$: Observable<Comment[]>;
    form: FormGroup;
    columnsToDisplay = ['entryDate', 'username', 'commentText'];

    constructor(
        private store$: Store<RootStoreState.State>,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit(): void {
        switch (this.mode) {
            case CommentMode.Photos:
                this.initPhotoComments();
                break;
            case CommentMode.Videos:
                this.initVideoComments();
                break;
            default:
                throw new Error('invalid comment mode!');
        }

        this.form = this.formBuilder.group({
            comment: ['', Validators.required]
        });
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    private initPhotoComments(): void {
        this.comments$ = this.store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoComments),
            tap(x => this.saveSucceeded())
        );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(photo => !!photo),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadCommentsRequest({ photoId: photo.id }))),
                tap(photo => this.currentId = photo.id)
            ).subscribe()
        );
    }

    private initVideoComments(): void {
        this.comments$ = this.store$.pipe(
            select(VideoStoreSelectors.selectCurrentVideoComments),
            tap(x => this.saveSucceeded())
        );

        this.destroySub.add(this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                filter(video => !!video),
                tap(video => this.store$.dispatch(VideoStoreActions.loadCommentsRequest({ videoId: video.id }))),
                tap(video => this.currentId = video.id)
            ).subscribe()
        );
    }

    onComment(): void {
        const comment = this.form.get('comment').value as string;

        if (this.currentId === -1) {
            return;
        }

        if (this.mode === CommentMode.Photos) {
            this.store$.dispatch(PhotoStoreActions.addCommentRequest({ photoId: this.currentId, comment }));
        }

        if (this.mode === CommentMode.Videos) {
            this.store$.dispatch(VideoStoreActions.addCommentRequest({ videoId: this.currentId, comment }));
        }
    }

    onCancel(): void {
        this.clearNewComment();
    }

    saveSucceeded(): void {
        this.clearNewComment();
    }

    private clearNewComment(): void {
        this.form.get('comment').setValue('');
    }
}
