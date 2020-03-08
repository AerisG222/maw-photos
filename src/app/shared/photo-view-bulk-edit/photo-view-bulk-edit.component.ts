import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { Category } from 'src/app/core/models/category.model';
import { LayoutStoreActions, PhotoCategoryStoreSelectors, PhotoStoreSelectors } from 'src/app/core/root-store';
import { Photo } from 'src/app/core/models/photo.model';

@Component({
    selector: 'app-photo-view-bulk-edit',
    templateUrl: './photo-view-bulk-edit.component.html',
    styleUrls: ['./photo-view-bulk-edit.component.scss']
})
export class PhotoViewBulkEditComponent implements OnInit, OnDestroy {
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    toggleSelectButtonText = 'Select All';

    constructor(
        private store$: Store<{}>
    ) {

    }

    ngOnInit(): void {
        this.category$ = this.store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCurrentCategoryAsCategory)
            );

        this.photos$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos)
            );
    }

    ngOnDestroy(): void {
        this.store$.dispatch(LayoutStoreActions.openRightSidebarRequest());
    }

    onToggleSelectAll(): void {
        if(this.toggleSelectButtonText === 'Select All') {
            this.toggleSelectButtonText = 'Deselect All';
        } else {
            this.toggleSelectButtonText = 'Select All';
        }
    }

    trackByPhoto(index: number, photo: Photo): string {
        return !!photo ? null : photo.id.toString();
    }
}
