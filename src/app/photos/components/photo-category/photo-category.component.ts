import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
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
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.isFullscreen$ = this.store.select(PhotoStoreSelectors.isFullscreenView);
        this.isMapView$ = this.store.select(PhotoStoreSelectors.isMapView);
        this.isBulkEditView$ = this.store.select(PhotoStoreSelectors.isBulkEditView);
        this.isGridView$ = this.store.select(PhotoStoreSelectors.isGridView);

        this.store.dispatch(PhotoStoreActions.clearRequest());

        this.route.params
            .pipe(
                first(),
                map(p => Number(p.id)),
                tap(id => this.store.dispatch(PhotoCategoryStoreActions.setActiveCategoryId({ categoryId: id }))),
                tap(id => this.store.dispatch(PhotoStoreActions.loadRequest({ categoryId: id })))
            ).subscribe();
    }

    ngOnDestroy(): void {
        this.store.dispatch(PhotoStoreActions.unsetActivePhotoId());
    }
}
