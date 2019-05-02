import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { RootStoreState, PhotoStoreSelectors, VideoStoreSelectors } from 'src/app/core/root-store';
import { tap, takeUntil, filter } from 'rxjs/operators';

@Component({
    selector: 'app-info-panel',
    templateUrl: './info-panel.component.html',
    styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    showPhotoInfoPanel = false;
    showVideoInfoPanel = false;

    constructor(
        private _store$: Store<RootStoreState.State>,
    ) { }

    ngOnInit() {
        this.destroySub.add(this._store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhoto),
            filter(photo => !!photo),
            tap(x => this.showVideoInfoPanel = false),
            tap(x => this.showPhotoInfoPanel = true)
        ).subscribe());

        this.destroySub.add(this._store$.pipe(
            select(VideoStoreSelectors.selectCurrentVideo),
            filter(video => !!video),
            tap(x => this.showPhotoInfoPanel = false),
            tap(x => this.showVideoInfoPanel = true)
        ).subscribe());
    }

    ngOnDestroy() {
        this.destroySub.unsubscribe();
    }
}
