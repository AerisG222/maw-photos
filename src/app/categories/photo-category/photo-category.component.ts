import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
    LayoutStoreActions,
    PhotoCategoryStoreActions,
    PhotoStoreSelectors, PhotoStoreActions,
    SettingsStoreActions
} from 'src/app/core/root-store';

@Component({
    selector: 'app-photo-category',
    templateUrl: './photo-category.component.html',
    styleUrls: ['./photo-category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoCategoryComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    isFullscreen$: Observable<boolean>;
    isMapView$: Observable<boolean>;

    constructor(
        private route: ActivatedRoute,
        private store$: Store<{}>
    ) {

    }

    ngOnInit() {
        this.isFullscreen$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsFullscreenView)
            );

        this.isMapView$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsMapView)
            );

        this.store$.dispatch(PhotoStoreActions.clearRequest());
        this.store$.dispatch(SettingsStoreActions.loadRequest());
        this.store$.dispatch(LayoutStoreActions.openRightSidebarRequest());

        this.destroySub.add(this.route.params
            .pipe(
                map(p => Number(p.id)),
                tap(id => this.store$.dispatch(PhotoCategoryStoreActions.setCurrentById({ categoryId: id }))),
                tap(id => this.store$.dispatch(PhotoStoreActions.loadRequest({ categoryId: id })))
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.store$.dispatch(LayoutStoreActions.closeRightSidebarRequest());
        this.store$.dispatch(PhotoStoreActions.setCurrent({ photo: null }));
        this.destroySub.unsubscribe();
    }
}
