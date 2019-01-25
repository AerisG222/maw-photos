import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, flatMap, tap, take } from 'rxjs/operators';

import { Photo } from '../../core/models/photo.model';
import { Category } from '../../core/models/category.model';
import { Store, select } from '@ngrx/store';
import { RootStoreState, PhotoCategoryStoreSelectors } from 'src/app/core/root-store';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/core/root-store/photo-store';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    activePhoto: Photo;

    constructor(
        private _route: ActivatedRoute,
        private _store$: Store<RootStoreState.State>
        ) {

    }

    ngOnInit() {
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

        categoryId$.pipe(
            map(id => this._store$.dispatch(new PhotoStoreActions.LoadRequestAction({ categoryId: id }))),
            take(1)
        ).subscribe();
    }

    back(year: number): void {
        console.log(year);
    }
}
