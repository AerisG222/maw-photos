import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RootStoreState, PhotoStoreSelectors, VideoStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-info-panel',
    templateUrl: './info-panel.component.html',
    styleUrls: ['./info-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoPanelComponent implements OnInit {
    showPhotoInfoPanel$: Observable<boolean>;
    showVideoInfoPanel$: Observable<boolean>;

    constructor(
        private store$: Store<RootStoreState.State>,
    ) { }

    ngOnInit() {
        this.showPhotoInfoPanel$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                map(photo => !!photo)
            );

        this.showVideoInfoPanel$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                map(video => !!video)
            );
    }
}
