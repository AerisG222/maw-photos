import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { RootStoreState, PhotoStoreSelectors, VideoStoreSelectors } from 'src/app/core/root-store';
import { tap, takeUntil, filter } from 'rxjs/operators';

@Component({
    selector: 'app-info-panel',
    templateUrl: './info-panel.component.html',
    styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit, OnDestroy {
    destroy$ = new Subject<boolean>();
    showPhotoInfoPanel = false;
    showVideoInfoPanel = false;

    constructor(
        private _store$: Store<RootStoreState.State>,
    ) { }

    ngOnInit() {
        this._store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhoto),
            filter(photo => photo !== null),
            tap(x => this.showVideoInfoPanel = false),
            tap(x => this.showPhotoInfoPanel = true),
            takeUntil(this.destroy$)
        ).subscribe();

        this._store$.pipe(
            select(VideoStoreSelectors.selectCurrentVideo),
            filter(video => video !== null),
            tap(x => this.showPhotoInfoPanel = false),
            tap(x => this.showVideoInfoPanel = true),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }
}
