import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { PhotoStoreSelectors } from '../../../core/root-store/photos-store';
import { PhotoCategoryStoreSelectors, PhotoCategoryStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-photos-sidebar-category-teaser-chooser',
    templateUrl: './sidebar-category-teaser-chooser.component.html',
    styleUrls: ['./sidebar-category-teaser-chooser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarCategoryTeaserChooserComponent {
    currentTeaserUrl$ = this.store.select(PhotoCategoryStoreSelectors.activeCategoryTeaserUrl);

    constructor(
        private store: Store
    ) {

    }

    onSetTeaser(): void {
        this.store.select(PhotoStoreSelectors.activePhoto)
            .pipe(
                first()
            ).subscribe({
                next: photo => {
                    if(!!photo) {
                        this.store.dispatch(PhotoCategoryStoreActions.setTeaserRequest({
                            categoryId: photo.categoryId,
                            photoId: photo.id
                        }));
                    }
                },
                error: err => console.log(`error trying to add comment: ${ err }`)
            });
    }
}
