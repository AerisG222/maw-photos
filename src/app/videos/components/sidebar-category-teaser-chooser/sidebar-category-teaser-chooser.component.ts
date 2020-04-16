import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import { VideoStoreSelectors } from '../../store';
import { VideoCategoryStoreSelectors, VideoCategoryStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-videos-sidebar-category-teaser-chooser',
    templateUrl: './sidebar-category-teaser-chooser.component.html',
    styleUrls: ['./sidebar-category-teaser-chooser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarCategoryTeaserChooserComponent implements OnInit, OnDestroy {
    private categoryId = -1;
    private videoId = -1;
    private destroySub = new Subscription();

    currentTeaserUrl$: Observable<string>;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.destroySub.add(this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                filter(v => !!v),
                tap(v => this.videoId = v.id),
                tap(v => this.categoryId = v.categoryId)
            ).subscribe()
        );

        this.currentTeaserUrl$ = this.store$.pipe(
            select(VideoCategoryStoreSelectors.selectCurrentCategory),
            filter(c => !!c),
            map(c => c.teaserImageSq.url)
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onSetTeaser(): void {
        if (this.categoryId !== -1 && this.videoId !== -1) {
            this.store$.dispatch(VideoCategoryStoreActions.setTeaserRequest({ categoryId: this.categoryId, videoId: this.videoId }));
        }
    }
}
