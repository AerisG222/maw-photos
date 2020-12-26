import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { Comment } from 'src/app/models/comment.model';
import { VideoStoreSelectors, VideoStoreActions } from 'src/app/videos/store';

@Component({
    selector: 'app-videos-sidebar-comments',
    templateUrl: './sidebar-comments.component.html',
    styleUrls: ['./sidebar-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarCommentsComponent implements OnInit {
    comments$: Observable<Comment[] | null> | null = null;

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.comments$ = this.store.select(VideoStoreSelectors.activeVideoComments);
    }

    onComment(comment: string): void {
        this.store.select(VideoStoreSelectors.activeVideoId)
            .pipe(
                first()
            ).subscribe({
                next: id => this.store.dispatch(VideoStoreActions.addCommentRequest({ videoId: id as number, comment })),
                error: err => console.log(`error trying to add a comment: ${ err }`)
            });
    }
}
