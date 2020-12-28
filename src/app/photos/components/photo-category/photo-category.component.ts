import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PhotoStoreSelectors } from 'src/app/photos/store';

@Component({
    selector: 'app-photos-photo-category',
    templateUrl: './photo-category.component.html',
    styleUrls: ['./photo-category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoCategoryComponent implements OnInit {
    isFullscreen$: Observable<boolean> | null = null;
    isMapView$: Observable<boolean> | null = null;
    isBulkEditView$: Observable<boolean> | null = null;
    isGridView$: Observable<boolean> | null = null;

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.isFullscreen$ = this.store.select(PhotoStoreSelectors.isFullscreenView);
        this.isMapView$ = this.store.select(PhotoStoreSelectors.isMapView);
        this.isBulkEditView$ = this.store.select(PhotoStoreSelectors.isBulkEditView);
        this.isGridView$ = this.store.select(PhotoStoreSelectors.isGridView);
    }
}
