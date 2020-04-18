import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, concatMap } from 'rxjs/operators';

import * as PhotoCategoryActions from './actions';
import * as PhotoCategorySelectors from './selectors';
import { photoApiServiceToken, PhotoApiService } from 'src/app/core/services/photo-api.service';
import { PhotoCategory } from 'src/app/models/photo-category.model';
import { Category } from 'src/app/models/category.model';
import { CategoryType } from 'src/app/models/category-type.model';

@Injectable()
export class PhotoCategoryStoreEffects {
    constructor(
        @Inject(photoApiServiceToken) private api: PhotoApiService,
        private actions$: Actions,
        private store$: Store
    ) {

    }

    loadRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoCategoryActions.loadRequest),
            withLatestFrom(this.store$.pipe(
                select(PhotoCategorySelectors.selectAllCategories)
            )),
            switchMap(([action, categories]) => {
                if (categories.length !== 0) {
                    return of(PhotoCategoryActions.loadRequestedSatisfiedByCache());
                }

                return this.api.getCategories()
                    .pipe(
                        map(cat => PhotoCategoryActions.loadSuccess({ categories: this.adaptCategories(cat.items) })),
                        catchError(error => of(PhotoCategoryActions.loadFailure({ error })))
                    );
            })
        )
    );

    setTeaserEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoCategoryActions.setTeaserRequest),
            concatMap(action =>
                this.api.setTeaser(action.categoryId, action.photoId)
                    .pipe(
                        map(category => PhotoCategoryActions.setTeaserSuccess({ category: this.adaptCategory(category) })),
                        catchError(error => of(PhotoCategoryActions.setTeaserFailure({ error })))
                    )
            )
        )
    );

    private adaptCategories(categories: PhotoCategory[]): Category[] {
        return categories.map(c => this.adaptCategory(c));
    }

    private adaptCategory(category: PhotoCategory): Category {
        return {
            type: CategoryType.photo,
            route: '/photos',
            id: category.id,
            name: category.name,
            year: category.year,
            createDate: category.createDate,
            teaserImage: category.teaserImage,
            teaserImageSq: category.teaserImageSq,
            actual: category
        };
    }
}
