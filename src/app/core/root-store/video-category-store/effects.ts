import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, withLatestFrom, concatMap, exhaustMap } from 'rxjs/operators';

import * as VideoCategoryStoreActions from './actions';
import * as videoCategoryStoreSelectors from './selectors';
import { videoApiServiceToken, VideoApiService } from 'src/app/core/services/video-api.service';
import { VideoCategory } from 'src/app/models/video-category.model';
import { Category } from 'src/app/models/category.model';
import { CategoryType } from 'src/app/models/category-type.model';

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
            route: '/videos',
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
