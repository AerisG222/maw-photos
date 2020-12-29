import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, interval, Subscription } from 'rxjs';
import { tap, takeUntil, filter, map } from 'rxjs/operators';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/photos/store';
import { PhotoCategoryStoreActions, SettingsStoreSelectors } from 'src/app/core/root-store';
import { Photo } from 'src/app/models/photo.model';

@Component({
    selector: 'app-photos-random',
    templateUrl: './random.component.html',
    styleUrls: ['./random.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomComponent implements OnInit, OnDestroy {
    isFullscreen$ = this.store.select(PhotoStoreSelectors.isFullscreenView);

    private killFetch = new Subject<boolean>();
    private destroySub = new Subscription();

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.destroySub.add(this.store
            .select(SettingsStoreSelectors.settings)
            .pipe(
                tap(x => this.killFetch.next(true)),
                tap(settings => this.startRandomFetch(settings.photoListSlideshowDisplayDurationSeconds * 1000))
            ).subscribe()
        );

        this.destroySub.add(this.store
            .select(PhotoStoreSelectors.activePhoto)
            .pipe(
                filter(x => !!x),
                map(x => x as Photo),
                tap(photo => this.store.dispatch(PhotoCategoryStoreActions.setActiveCategoryId({ categoryId: photo.categoryId })))
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.killFetch.next(true);
        this.store.dispatch(PhotoStoreActions.unsetActivePhotoId());
        this.destroySub.unsubscribe();
    }

    private startRandomFetch(delay: number): void {
        interval(delay)
            .pipe(
                tap(x => this.store.dispatch(PhotoStoreActions.loadRandomRequest())),
                takeUntil(this.killFetch)
            ).subscribe();
    }
}
