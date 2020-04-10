import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { CategoryTeaserChooserMode } from './category-teaser-chooser-mode.model';
import { PhotoStoreSelectors } from 'src/app/photos/store';
import { VideoStoreSelectors } from 'src/app/videos/store';
import {
    PhotoCategoryStoreActions,
    PhotoCategoryStoreSelectors,
    VideoCategoryStoreActions,
    VideoCategoryStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-category-teaser-chooser',
    templateUrl: './category-teaser-chooser.component.html',
    styleUrls: ['./category-teaser-chooser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTeaserChooserComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();
    private categoryId: number;
    private id: number;

    currentTeaserUrl$: Observable<string>;

    @Input() mode: CategoryTeaserChooserMode;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        switch (this.mode)
        {
            case CategoryTeaserChooserMode.Photos:
                this.initPhotos();
                break;
            case CategoryTeaserChooserMode.Videos:
                this.initVideos();
                break;
            default:
                throw Error('invalid category teaser mode');
        }
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    initPhotos(): void {
        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(p => !!p),
                tap(p => this.id = p.id),
                tap(p => this.categoryId = p.categoryId)
            ).subscribe()
        );

        this.currentTeaserUrl$ = this.store$.pipe(
            select(PhotoCategoryStoreSelectors.selectCurrentCategory),
            filter(c => !!c),
            map(c => c.teaserImageSq.url)
        );
    }

    initVideos(): void {
        this.destroySub.add(this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                tap(v => !!v),
                tap(v => this.id = v.id),
                tap(v => this.categoryId = v.categoryId)
            ).subscribe()
        );

        this.currentTeaserUrl$ = this.store$.pipe(
            select(VideoCategoryStoreSelectors.selectCurrentCategory),
            filter(c => !!c),
            map(c => c.teaserImageSq.url)
        );
    }

    onSetTeaser(): void {
        switch (this.mode) {
            case CategoryTeaserChooserMode.Photos:
                this.store$.dispatch(PhotoCategoryStoreActions.setTeaserRequest({ categoryId: this.categoryId, photoId: this.id }));
                break;
            case CategoryTeaserChooserMode.Videos:
                this.store$.dispatch(VideoCategoryStoreActions.setTeaserRequest({ categoryId: this.categoryId, videoId: this.id }));
                break;
        }
    }
}
