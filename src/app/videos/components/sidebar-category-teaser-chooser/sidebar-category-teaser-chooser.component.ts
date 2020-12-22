import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

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
export class SidebarCategoryTeaserChooserComponent implements OnInit, OnDestroy {
    currentTeaserUrl$: Observable<string> | null = null;

    private categoryId = -1;
    private videoId = -1;
    private destroySub = new Subscription();

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.destroySub.add(this.store
            .select(VideoStoreSelectors.selectActiveVideo)
            .pipe(
                filter(v => !!v),
                map(v => v as Video),
                tap(v => this.videoId = v.id),
                tap(v => this.categoryId = v.categoryId)
            ).subscribe()
        );

        this.currentTeaserUrl$ = this.store
            .select(VideoCategoryStoreSelectors.selectActiveCategory)
            .pipe(
                filter(c => !!c),
                map(c => (c as Category).teaserImageSq.url)
            );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onSetTeaser(): void {
        if (this.categoryId !== -1 && this.videoId !== -1) {
            this.store.dispatch(VideoCategoryStoreActions.setTeaserRequest({ categoryId: this.categoryId, videoId: this.videoId }));
        }
    }
}
