import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, flatMap, tap, takeUntil } from 'rxjs/operators';

import { Photo } from '../../core/models/photo.model';
import { Category } from '../../core/models/category.model';
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
import { LayoutStoreActions } from 'src/app/core/root-store/layout-store';
import { PhotoEffects } from 'src/app/core/models/photo-effects.model';
import { RandomControlService } from 'src/app/core/services/random-control.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    providers: [ RandomControlService ]
})
export class CategoryComponent implements OnInit, OnDestroy {
    destroy$ = new Subject<boolean>();
    settings$: Observable<Settings>;
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    activePhoto$: Observable<Photo>;
    effects$: Observable<PhotoEffects>;
    isFullscreen$: Observable<boolean>;

    private hotkeys: Hotkey[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService,
        private randomControlSvc: RandomControlService
    ) {

    }

    ngOnInit() {
        this._store$.dispatch(new PhotoStoreActions.ClearRequestAction());

        this.randomControlSvc.start();

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

        const categoryId$ = this._route.params
            .pipe(
                map(p => Number(p.id))
            );

        this.settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
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

        this.isFullscreen$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsFullscreenView)
            );

        this.activePhoto$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto)
            );

        this.effects$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoEffects)
            );

        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());
        this._store$.dispatch(new LayoutStoreActions.OpenRightSidebarRequestAction());

        categoryId$.pipe(
            map(id => this._store$.dispatch(new PhotoStoreActions.LoadRequestAction({ categoryId: id }))),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    ngOnDestroy(): void {
        this._store$.dispatch(new LayoutStoreActions.ExitFullscreenRequestAction());
        this.randomControlSvc.dispose();
        this._hotkeysService.remove(this.hotkeys);
        this._store$.dispatch(new LayoutStoreActions.CloseRightSidebarRequestAction());
        this.destroy$.next(true);
    }

    onSelectPhoto(photo: Photo): void {
        this.setCurrentPhoto(photo);
    }

    private setCurrentPhoto(photo: Photo): void {
        this._store$.dispatch(new PhotoStoreActions.SetCurrentAction({ photo: photo }));
    }
}
