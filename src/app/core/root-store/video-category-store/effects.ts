import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, concatMap } from 'rxjs/operators';

import * as VideoCategoryActions from './actions';
import * as videoCategorySelectors from './selectors';
import { videoApiServiceToken, VideoApiService } from 'src/app/core/services/video-api.service';
import { VideoCategory } from 'src/app/models/video-category.model';
import { Category } from 'src/app/models/category.model';
import { CategoryType } from 'src/app/models/category-type.model';

@Injectable()
export class VideoCategoryStoreEffects {
    constructor(
        @Inject(videoApiServiceToken) private api: VideoApiService,
        private actions$: Actions,
        private store$: Store
    ) {

    }

    loadRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoCategoryActions.loadRequest),
            withLatestFrom(this.store$.pipe(
                select(videoCategorySelectors.selectAllCategories)
            )),
            switchMap(([action, categories]) => {
                if (categories.length !== 0) {
                    return of(VideoCategoryActions.loadRequestedSatisfiedByCache());
                }

                return this.api.getCategories()
                    .pipe(
                        map(cat => VideoCategoryActions.loadSuccess({ categories: this.adaptCategories(cat.items) })),
                        catchError(error => of(VideoCategoryActions.loadFailure({ error })))
                    );
            })
        );
    });

    setTeaserEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoCategoryActions.setTeaserRequest),
            concatMap(action =>
                this.api.setTeaser(action.categoryId, action.videoId)
                    .pipe(
                        map(category => VideoCategoryActions.setTeaserSuccess({ category: this.adaptCategory(category) })),
                        catchError(error => of(VideoCategoryActions.setTeaserFailure({ error })))
                    )
            )
        );
    });

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
