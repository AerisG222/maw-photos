import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { interval, combineLatest, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';
import { SettingsStoreSelectors } from 'src/app/core/root-store';


@Injectable({
    providedIn: 'root'
})
export class SlideshowControlService {
    private interval$: Subscription | null = null;

    constructor(
        private store$: Store
    ) {
        combineLatest([
            this.store$.pipe(select(PhotoStoreSelectors.selectSlideshowIsPlaying)),
            this.store$.pipe(select(PhotoStoreSelectors.selectIsActivePhotoLast)),
            this.store$.pipe(select(SettingsStoreSelectors.selectPhotoListSlideshowDisplayDurationSeconds))
        ]).pipe(
            tap(([isPlaying, isLast, displayDuration]) => {
                if (isPlaying) {
                    if (isLast) {
                        this.stopSlideshow();
                        this.store$.dispatch(PhotoStoreActions.stopSlideshowRequest());
                    } else {
                        this.startSlideshow(displayDuration * 1000);
                    }
                } else {
                    this.stopSlideshow();
                }
            })
        ).subscribe();
    }

    private startSlideshow(duration: number): void {
        if (!!!this.interval$) {
            this.interval$ = interval(duration)
                .pipe(
                    tap(x => this.store$.dispatch(PhotoStoreActions.moveNextRequest()))
                ).subscribe();
        }
    }

    private stopSlideshow(): void {
        if (!!this.interval$) {
            this.interval$.unsubscribe();
            this.interval$ = null;
        }
    }
}
