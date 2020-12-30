import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { VideoStoreSelectors, VideoStoreActions } from 'src/app/videos/store';

@Component({
    selector: 'app-videos-sidebar-comments',
    templateUrl: './sidebar-comments.component.html',
    styleUrls: ['./sidebar-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarCommentsComponent {
    comments$ = this.store.select(VideoStoreSelectors.activeVideoComments);

    constructor(
        private store: Store
    ) {

    }

    onComment(comment: string): void {
        this.store.select(VideoStoreSelectors.activeVideoId)
            .pipe(
                first()
            ).subscribe({
                next: id => {
                    if(!!id) {
                        this.store.dispatch(VideoStoreActions.addCommentRequest({ videoId: id as number, comment }));
                    }
                },
                error: err => console.log(`error trying to add a comment: ${ err }`)
            });
    }
}
