import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import { Comment } from 'src/app/models/comment.model';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';
import { Photo } from 'src/app/models/photo.model';

@Component({
    selector: 'app-photos-sidebar-comments',
    templateUrl: './sidebar-comments.component.html',
    styleUrls: ['./sidebar-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarCommentsComponent implements OnInit, OnDestroy {
    currentId = -1;
    comments$?: Observable<Comment[]>;
    destroySub = new Subscription();

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.comments$ = this.store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoComments),
            filter(x => !!x),
            map(x => x as Comment[])
        );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(photo => !!photo),
                map(photo => photo as Photo),
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
