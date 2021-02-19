import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
    catchError,
    map,
    withLatestFrom,
    concatMap,
    exhaustMap,
} from 'rxjs/operators';

import * as PhotoCategoryActions from './actions';
import * as PhotoCategorySelectors from './selectors';
import {
    photoApiServiceToken,
    PhotoApiService,
} from '@core/services/photo-api.service';
import { PhotoCategory, Category, CategoryType, RouteHelper } from '@models';

@Injectable()
export class PhotoCategoryStoreEffects {
    loadRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoCategoryActions.loadRequest),
            withLatestFrom(
                this.store.select(PhotoCategorySelectors.allCategories)
            ),
            exhaustMap(([, categories]) => {
                if (categories.length !== 0) {
                    return of(
                        PhotoCategoryActions.loadRequestedSatisfiedByCache()
                    );
                }

                return this.api.getCategories().pipe(
                    map((cat) =>
                        PhotoCategoryActions.loadSuccess({
                            categories: this.adaptCategories(cat.items),
                        })
                    ),
                    catchError((error) =>
                        of(PhotoCategoryActions.loadFailure({ error }))
                    )
                );
            })
        );
    });

    setTeaserEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoCategoryActions.setTeaserRequest),
            concatMap((action) =>
                this.api.setTeaser(action.categoryId, action.photoId).pipe(
                    map((category) =>
                        PhotoCategoryActions.setTeaserSuccess({
                            category: this.adaptCategory(category),
                        })
                    ),
                    catchError((error) =>
                        of(PhotoCategoryActions.setTeaserFailure({ error }))
                    )
                )
            )
        );
    });

    constructor(
        @Inject(photoApiServiceToken) private api: PhotoApiService,
        private actions$: Actions,
        private store: Store
    ) {}

    private adaptCategories(categories: PhotoCategory[]): Category[] {
        return categories.map((c) => this.adaptCategory(c));
    }

    private adaptCategory(category: PhotoCategory): Category {
        return {
            type: CategoryType.photo,
            route: RouteHelper.photoCategoriesAbs(undefined, category.id),
            id: category.id,
            name: category.name,
            year: category.year,
            createDate: category.createDate,
            teaserImage: category.teaserImage,
            teaserImageSq: category.teaserImageSq,
            actual: category,
        };
    }
}
