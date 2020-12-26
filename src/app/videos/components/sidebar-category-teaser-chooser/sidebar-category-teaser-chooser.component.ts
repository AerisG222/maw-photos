import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';

import { VideoStoreSelectors } from '../../store';
import { VideoCategoryStoreSelectors, VideoCategoryStoreActions } from 'src/app/core/root-store';
import { Category } from 'src/app/models/category.model';
import { Video } from 'src/app/models/video.model';

@Component({
    selector: 'app-videos-sidebar-category-teaser-chooser',
    templateUrl: './sidebar-category-teaser-chooser.component.html',
    styleUrls: ['./sidebar-category-teaser-chooser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarCategoryTeaserChooserComponent implements OnInit {
    currentTeaserUrl$: Observable<string> | null = null;

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.currentTeaserUrl$ = this.store
            .select(VideoCategoryStoreSelectors.activeCategory)
            .pipe(
                filter(c => !!c),
                map(c => (c as Category).teaserImageSq.url)
            );
    }

    onSetTeaser(): void {
        this.store.select(VideoStoreSelectors.activeVideo)
            .pipe(
                first(),
                filter(video => !!video),
                map(video => video as Video)
            )
            .subscribe({
                next: video => this.store.dispatch(VideoCategoryStoreActions.setTeaserRequest({ categoryId: video.categoryId, videoId: video.id })),
                error: err => console.log(`error trying to set category teaser: ${ err }`)
            });
    }
}
