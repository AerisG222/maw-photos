import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, withLatestFrom, concatMap, exhaustMap } from 'rxjs/operators';

import * as VideoCategoryStoreActions from './actions';
import * as videoCategoryStoreSelectors from './selectors';
import { videoApiServiceToken, VideoApiService } from '@core/services/video-api.service';
import { Category, CategoryType, VideoCategory, RouteHelper } from '@models';

@Injectable()
export class VideoCategoryStoreEffects {
    loadRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoCategoryStoreActions.loadRequest),
            withLatestFrom(this.store.select(videoCategoryStoreSelectors.allCategories)),
            exhaustMap(([action, categories]) => {
                if (categories.length !== 0) {
                    return of(VideoCategoryStoreActions.loadRequestedSatisfiedByCache());
                }

                return this.api.getCategories()
                    .pipe(
                        map(cat => VideoCategoryStoreActions.loadSuccess({ categories: this.adaptCategories(cat.items) })),
                        catchError(error => of(VideoCategoryStoreActions.loadFailure({ error })))
                    );
            })
        );
    });

    setTeaserEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoCategoryStoreActions.setTeaserRequest),
            concatMap(action =>
                this.api.setTeaser(action.categoryId, action.videoId)
                    .pipe(
                        map(category => VideoCategoryStoreActions.setTeaserSuccess({ category: this.adaptCategory(category) })),
                        catchError(error => of(VideoCategoryStoreActions.setTeaserFailure({ error })))
                    )
            )
        );
    });

    constructor(
        @Inject(videoApiServiceToken) private api: VideoApiService,
        private actions$: Actions,
        private store: Store
    ) {

    }

    private adaptCategories(categories: VideoCategory[]): Category[] {
        return categories.map(c => this.adaptCategory(c));
    }

    private adaptCategory(category: VideoCategory): Category {
        return {
            type: CategoryType.video,
            route: RouteHelper.videoCategoriesAbs(category.id),
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
