import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { Comment } from 'src/app/models/comment.model';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';

@Component({
    selector: 'app-sidebar-comments',
    templateUrl: './sidebar-comments.component.html',
    styleUrls: ['./sidebar-comments.component.scss']
})
export class SidebarCommentsComponent implements OnInit, OnDestroy {
    currentId = -1;
    comments$: Observable<Comment[]>;
    destroySub = new Subscription();

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.comments$ = this.store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoComments)
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

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onComment(comment: string): void {
        if (this.currentId !== -1) {
            this.store$.dispatch(PhotoStoreActions.addCommentRequest({ photoId: this.currentId, comment }));
        }
    }
}
