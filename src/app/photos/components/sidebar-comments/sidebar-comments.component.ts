import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';

@Component({
    selector: 'app-photos-sidebar-comments',
    templateUrl: './sidebar-comments.component.html',
    styleUrls: ['./sidebar-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarCommentsComponent {
    comments$ = this.store.select(PhotoStoreSelectors.activePhotoComments);

    constructor(
        private store: Store
    ) {

    }

    onComment(comment: string): void {
        this.store.select(PhotoStoreSelectors.activePhotoId)
            .pipe(
                first()
            ).subscribe({
                next: id => {
                    if(!!id) {
                        this.store.dispatch(PhotoStoreActions.addCommentRequest({ photoId: id as number, comment }));
                    }
                },
                error: err => console.log(`error trying to add comment: ${ err }`)
            });
    }
}
