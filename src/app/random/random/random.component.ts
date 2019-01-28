import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, flatMap } from 'rxjs/operators';

import { Category } from 'src/app/core/models/category.model';
import { Photo } from 'src/app/core/models/photo.model';
import { Settings } from 'src/app/core/models/settings.model';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/core/root-store/photo-store';
import {
    RootStoreState,
    SettingsStoreSelectors,
    PhotoCategoryStoreSelectors,
    PhotoCategoryStoreActions,
    SettingsStoreActions
} from 'src/app/core/root-store';

@Component({
    selector: 'app-random',
    templateUrl: './random.component.html',
    styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {
    settings$: Observable<Settings>;
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    activePhoto$: Observable<Photo>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this._store$.dispatch(new PhotoStoreActions.ClearRequestAction());

        this.settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            );

        this.photos$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos),
                tap(photos => this.setCurrentPhoto(photos[0]))
            );

        this.category$ = this._store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCurrentCategory),
            );

        this.activePhoto$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto)
            );

        this.activePhoto$
            .pipe(
                flatMap(photo => this._store$
                    .pipe(
                        select(PhotoCategoryStoreSelectors.selectCategoryById(photo.categoryId)),
                        tap(category => this._store$.dispatch(new PhotoCategoryStoreActions.SetCurrentAction({ category: category })))
                    )
                )
            );

        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());

        // start by loading 10 images
        for (let i = 0; i < 10; i++) {
            this._store$.dispatch(new PhotoStoreActions.LoadRandomRequestAction());
        }
    }

    onSelectPhoto(photo: Photo): void {
        this.setCurrentPhoto(photo);
    }

    private setCurrentPhoto(photo: Photo): void {
        this._store$.dispatch(new PhotoStoreActions.SetCurrentAction({ photo: photo }));
    }
}
