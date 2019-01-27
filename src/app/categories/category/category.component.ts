import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, flatMap, tap, take } from 'rxjs/operators';

import { Photo } from '../../core/models/photo.model';
import { Category } from '../../core/models/category.model';
import { Store, select } from '@ngrx/store';
import { RootStoreState, PhotoCategoryStoreSelectors, SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/core/root-store/photo-store';
import { Settings } from 'src/app/core/models/settings.model';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    settings$: Observable<Settings>;
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    activePhoto: Photo;

    constructor(
        private _route: ActivatedRoute,
        private _store$: Store<RootStoreState.State>
        ) {

    }

    ngOnInit() {
        this.settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            );

        const categoryId$ = this._route.params
            .pipe(
                map(p => Number(p.id))
            );

        this.category$ = categoryId$
            .pipe(
                flatMap(id => this._store$
                    .pipe(
                        select(PhotoCategoryStoreSelectors.selectCategoryById(id))
                    )
                )
            );

        this.photos$ = categoryId$
            .pipe(
                flatMap(id => this._store$
                    .pipe(
                        select(PhotoStoreSelectors.selectPhotosForCategory(id))
                    )),
                tap(photos => this.activePhoto = photos[0])
            );

        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());

        categoryId$.pipe(
            map(id => this._store$.dispatch(new PhotoStoreActions.LoadRequestAction({ categoryId: id }))),
            take(1)
        ).subscribe();
    }
}
