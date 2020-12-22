import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, filter, map } from 'rxjs/operators';

import { Comment } from 'src/app/models/comment.model';
import { VideoStoreSelectors, VideoStoreActions } from 'src/app/videos/store';
import { Video } from 'src/app/models/video.model';

@Component({
    selector: 'app-videos-sidebar-comments',
    templateUrl: './sidebar-comments.component.html',
    styleUrls: ['./sidebar-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarCommentsComponent implements OnInit {
    activeId = -1;
    comments$: Observable<Comment[] | null> | null = null;
    destroySub = new Subscription();

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.comments$ = this.store.select(VideoStoreSelectors.activeVideoComments);

        this.destroySub.add(this.store
            .select(VideoStoreSelectors.activeVideo)
            .pipe(
                filter(video => !!video),
                map(video => video as Video),
                tap(video => this.store.dispatch(VideoStoreActions.loadCommentsRequest({ videoId: video.id }))),
                tap(video => this.activeId = video.id)
            ).subscribe()
        );
    }

    onComment(comment: string): void {
        this.store.dispatch(VideoStoreActions.addCommentRequest({ videoId: this.activeId, comment }));
    }
}
