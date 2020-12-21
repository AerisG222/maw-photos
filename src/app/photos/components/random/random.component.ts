import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, interval, Subscription, Observable } from 'rxjs';
import { tap, take, takeUntil, filter, map } from 'rxjs/operators';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/photos/store';
import { PhotoCategoryStoreActions, PhotoCategoryStoreSelectors, SettingsStoreSelectors } from 'src/app/core/root-store';
import { Photo } from 'src/app/models/photo.model';
import { Category } from 'src/app/models/category.model';

@Component({
    selector: 'app-photos-random',
    templateUrl: './random.component.html',
    styleUrls: ['./random.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomComponent implements OnInit, OnDestroy {
    private killFetch = new Subject<boolean>();
    private destroySub = new Subscription();

    isFullscreen$: Observable<boolean> | null = null;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.store$.dispatch(PhotoStoreActions.clearRequest());

        this.isFullscreen$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsFullscreenView)
            );

        this.destroySub.add(this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(x => this.killFetch.next(true)),
                tap(settings => this.startRandomFetch(settings.photoListSlideshowDisplayDurationSeconds * 1000))
            ).subscribe()
        );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectActivePhoto),
                filter(x => !!x),
                map(x => x as Photo),
                tap(photo => this.store$.dispatch(PhotoCategoryStoreActions.setActiveCategoryId({ categoryId: photo.categoryId })))
            ).subscribe()
        );

        this.store$.dispatch(PhotoStoreActions.loadMultipleRandomRequest({ count: 10 }));
    }

    ngOnDestroy(): void {
        this.killFetch.next(true);
        this.store$.dispatch(PhotoStoreActions.unsetActivePhotoId());
        this.destroySub.unsubscribe();
    }

    private startRandomFetch(delay: number): void {
        interval(delay)
            .pipe(
                tap(x => this.store$.dispatch(PhotoStoreActions.loadRandomRequest())),
                takeUntil(this.killFetch)
            ).subscribe();
    }
}
