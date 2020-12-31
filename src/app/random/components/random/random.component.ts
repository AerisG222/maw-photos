import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store/photos-store';
import { PhotoCategoryStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-photos-random',
    templateUrl: './random.component.html',
    styleUrls: ['./random.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomComponent implements OnInit, OnDestroy {
    isFullscreen$ = this.store.select(PhotoStoreSelectors.isFullscreenView);

    private destroySub = new Subscription();

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.destroySub.add(this.store
            .select(PhotoStoreSelectors.activePhoto)
            .subscribe({
                next: photo => {
                    if(!!photo) {
                        this.store.dispatch(PhotoCategoryStoreActions.setActiveCategoryId({ categoryId: photo.categoryId }));
                    }
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.store.dispatch(PhotoStoreActions.unsetActivePhotoId());
        this.destroySub.unsubscribe();
    }
}
