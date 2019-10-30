import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { toolbarShow } from '../animations';
import { LayoutStoreActions, RootStoreState, PhotoStoreSelectors } from 'src/app/core/root-store';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoEffects } from 'src/app/core/models/photo-effects.model';

@Component({
    selector: 'app-photo-view-fullscreen',
    templateUrl: './photo-view-fullscreen.component.html',
    styleUrls: ['./photo-view-fullscreen.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoViewFullscreenComponent implements OnInit, OnDestroy {
    activePhoto$: Observable<Photo>;
    effects$: Observable<PhotoEffects>;

    constructor(
        private store$: Store<RootStoreState.State>
    ) { }

    ngOnInit() {
        this.activePhoto$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(x => !!x)
            );

        this.effects$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoEffects),
                filter(x => !!x)
            );
    }

    ngOnDestroy(): void {
        this.store$.dispatch(LayoutStoreActions.exitFullscreenRequest());
    }
}
