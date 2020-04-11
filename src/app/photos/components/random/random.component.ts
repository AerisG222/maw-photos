import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, interval, Subscription, Observable } from 'rxjs';
import { tap, take, takeUntil, filter } from 'rxjs/operators';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/photos/store';
import {
    PhotoCategoryStoreActions,
    PhotoCategoryStoreSelectors,
    SettingsStoreActions,
    SettingsStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-random',
    templateUrl: './random.component.html',
    styleUrls: ['./random.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomComponent implements OnInit, OnDestroy {
    private killFetch = new Subject<boolean>();
    private destroySub = new Subscription();

    isFullscreen$: Observable<boolean>;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit() {
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
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(x => !!x),
                tap(photo => {
                    this.store$
                        .pipe(
                            select(PhotoCategoryStoreSelectors.selectCategoryById, { id: photo.categoryId }),
                            tap(category => this.store$.dispatch(PhotoCategoryStoreActions.setCurrent({ category }))),
                            take(1)
                        ).subscribe();
                })
            ).subscribe()
        );

        this.store$.dispatch(SettingsStoreActions.loadRequest());
        this.store$.dispatch(PhotoStoreActions.loadMultipleRandomRequest({ count: 10 }));
    }

    ngOnDestroy(): void {
        this.killFetch.next(true);
        this.store$.dispatch(PhotoStoreActions.setCurrent({ photo: null }));
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
