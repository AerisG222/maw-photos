import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { interval, combineLatest, Subject, Observable } from 'rxjs';
import { tap, filter, takeUntil } from 'rxjs/operators';

import { PhotoStoreSelectors, PhotoStoreActions, RootStoreState, SettingsStoreSelectors } from 'src/app/core/root-store';
import { Settings } from '../models/settings.model';


@Injectable({
    providedIn: 'root'
})
export class SlideshowControlService {
    private killSlideshow$ = new Subject<boolean>();
    private isPlaying$: Observable<boolean>;
    private settings$: Observable<Settings>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) {
        this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLast),
                tap(x => this._store$.dispatch(new PhotoStoreActions.StopSlideshowRequestAction()))
            ).subscribe();

        this.isPlaying$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectSlideshowIsPlaying)
            );

        this.settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            );

        this.isPlaying$
            .pipe(
                filter(isPlaying => !isPlaying),
                tap(x => this.killSlideshow$.next(true))
            ).subscribe();

        combineLatest(
            this.isPlaying$,
            this.settings$
        ).pipe(
            filter(x => x[0]),
            tap(x => this.startSlideshow(x[1].photoListSlideshowDisplayDurationSeconds * 1000))
        ).subscribe();
    }

    private startSlideshow(duration: number): void {
        interval(duration)
            .pipe(
                tap(x => this._store$.dispatch(new PhotoStoreActions.MoveNextRequestAction())),
                takeUntil(this.killSlideshow$)
            ).subscribe();
    }
}