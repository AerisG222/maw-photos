import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, flatMap, tap, take } from 'rxjs/operators';

import { Photo } from '../../core/models/photo.model';
import { Category } from '../../core/models/category.model';
import { Store, select } from '@ngrx/store';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/core/root-store/photo-store';
import { Settings } from 'src/app/core/models/settings.model';
import {
    RootStoreState,
    PhotoCategoryStoreSelectors,
    SettingsStoreSelectors,
    SettingsStoreActions,
    PhotoCategoryStoreActions
} from 'src/app/core/root-store';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
    settings$: Observable<Settings>;
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    activePhoto$: Observable<Photo>;

    private hotkeys: Hotkey[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) {

    }

    ngOnInit() {
        this.hotkeys.push(<Hotkey> this._hotkeysService
            .add(new Hotkey(
                'right',
                (event: KeyboardEvent): boolean => {
                    this._store$.dispatch(new PhotoStoreActions.MoveNextRequestAction());
                    return false;
                }))
        );

        this.hotkeys.push(<Hotkey> this._hotkeysService
            .add(new Hotkey(
                'left',
                (event: KeyboardEvent): boolean => {
                    this._store$.dispatch(new PhotoStoreActions.MovePreviousRequestAction());
                    return false;
                }))
        );

        this._store$.dispatch(new PhotoStoreActions.ClearRequestAction());

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
                        select(PhotoCategoryStoreSelectors.selectCategoryById(id)),
                        tap(category => this._store$.dispatch(new PhotoCategoryStoreActions.SetCurrentAction({ category: category })))
                    )
                )
            );

        this.photos$ = categoryId$
            .pipe(
                flatMap(id => this._store$
                    .pipe(
                        select(PhotoStoreSelectors.selectPhotosForCategory(id))
                    )),
                tap(photos => this.setCurrentPhoto(photos[0]))
            );

        this.activePhoto$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto)
            );

        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());

        categoryId$.pipe(
            map(id => this._store$.dispatch(new PhotoStoreActions.LoadRequestAction({ categoryId: id }))),
            take(1)
        ).subscribe();
    }

    ngOnDestroy(): void {
        this._hotkeysService.remove(this.hotkeys);
    }

    onSelectPhoto(photo: Photo): void {
        this.setCurrentPhoto(photo);
    }

    private setCurrentPhoto(photo: Photo): void {
        this._store$.dispatch(new PhotoStoreActions.SetCurrentAction({ photo: photo }));
    }
}
