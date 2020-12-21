import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter, tap, map } from 'rxjs/operators';

import { PhotoStoreSelectors } from '../../store';
import { PhotoCategoryStoreSelectors, PhotoCategoryStoreActions } from 'src/app/core/root-store';
import { Subscription, Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Photo } from 'src/app/models/photo.model';

@Component({
    selector: 'app-photos-sidebar-category-teaser-chooser',
    templateUrl: './sidebar-category-teaser-chooser.component.html',
    styleUrls: ['./sidebar-category-teaser-chooser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarCategoryTeaserChooserComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();
    private categoryId = -1;
    private photoId = -1;

    currentTeaserUrl$: Observable<string> | null = null;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectActivePhoto),
                filter(p => !!p),
                map(p => p as Photo),
                tap(p => this.photoId = p.id),
                tap(p => this.categoryId = p.categoryId)
            ).subscribe()
        );

        this.currentTeaserUrl$ = this.store$.pipe(
            select(PhotoCategoryStoreSelectors.selectActiveCategory),
            filter(c => !!c),
            map(c => (c as Category).teaserImageSq.url)
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onSetTeaser(): void {
        this.store$.dispatch(PhotoCategoryStoreActions.setTeaserRequest({ categoryId: this.categoryId, photoId: this.photoId }));
    }
}
