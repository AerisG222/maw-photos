import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { VideoStoreSelectors } from '../../store';
import { VideoCategoryStoreSelectors, VideoCategoryStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-videos-sidebar-category-teaser-chooser',
    templateUrl: './sidebar-category-teaser-chooser.component.html',
    styleUrls: ['./sidebar-category-teaser-chooser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarCategoryTeaserChooserComponent {
    currentTeaserUrl$ = this.store.select(VideoCategoryStoreSelectors.activeCategoryTeaserUrl);

    constructor(
        private store: Store
    ) {

    }

    onSetTeaser(): void {
        this.store.select(VideoStoreSelectors.activeVideo)
            .pipe(
                first()
            )
            .subscribe({
                next: video => {
                    if(!!video) {
                        this.store.dispatch(VideoCategoryStoreActions.setTeaserRequest({
                            categoryId: video.categoryId,
                            videoId: video.id
                        }));
                    }
                },
                error: err => console.log(`error trying to set category teaser: ${ err }`)
            });
    }
}
