import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap, first } from 'rxjs/operators';

import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';
import { PhotoCategoryStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-photos-photo-category',
    templateUrl: './photo-category.component.html',
    styleUrls: ['./photo-category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoCategoryComponent implements OnInit, OnDestroy {
    isFullscreen$: Observable<boolean> | null = null;
    isMapView$: Observable<boolean> | null = null;
    isBulkEditView$: Observable<boolean> | null = null;
    isGridView$: Observable<boolean> | null = null;

    constructor(
        private route: ActivatedRoute,
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.isFullscreen$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsFullscreenView)
            );

        this.isMapView$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsMapView)
            );

        this.isBulkEditView$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsBulkEditView)
            );

        this.isGridView$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsGridView)
            );

        this.store$.dispatch(PhotoStoreActions.clearRequest());

        this.route.params
            .pipe(
                first(),
                map(p => Number(p.id)),
                tap(id => this.store$.dispatch(PhotoCategoryStoreActions.setActiveCategoryId({ categoryId: id }))),
                tap(id => this.store$.dispatch(PhotoStoreActions.loadRequest({ categoryId: id })))
            ).subscribe();
    }

    ngOnDestroy(): void {
        this.store$.dispatch(PhotoStoreActions.unsetActivePhotoId());
    }
}
