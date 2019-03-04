import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { PhotoStoreSelectors, PhotoStoreActions, RootStoreState, SettingsStoreSelectors } from 'src/app/core/root-store';

@Injectable({
    providedIn: 'root'
})
export class SlideshowControlService {
    private destroy$ = new Subject<boolean>();
    private intervalId: number = null;
    private slideshowDuration: number;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) { }

    start() {
        this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLast),
                map(x => this.stopSlideshow()),
                takeUntil(this.destroy$)
            ).subscribe();

        this._store$
            .pipe(
                select(PhotoStoreSelectors.selectSlideshowIsPlaying),
                tap(isPlaying => isPlaying ? this.startSlideshow() : this.stopSlideshow()),
                takeUntil(this.destroy$)
            ).subscribe();

        this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.slideshowDuration = settings.photoListSlideshowDisplayDurationSeconds * 1000),
                takeUntil(this.destroy$)
            ).subscribe();
    }

    dispose() {
        this.destroy$.next(true);

        this.stopSlideshow();
    }

    private startSlideshow(): void {
        this.intervalId = window.setInterval(() => {
            this._store$.dispatch(new PhotoStoreActions.MoveNextRequestAction());
        }, this.slideshowDuration);
    }

    private stopSlideshow(): void {
        this._store$.dispatch(new PhotoStoreActions.StopSlideshowRequestAction());

        if (this.intervalId != null) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
