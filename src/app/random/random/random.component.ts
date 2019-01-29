import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, flatMap, take } from 'rxjs/operators';

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
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { LayoutStoreActions } from 'src/app/core/root-store/layout-store';

@Component({
    selector: 'app-random',
    templateUrl: './random.component.html',
    styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit, OnDestroy {
    settings$: Observable<Settings>;
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    activePhoto$: Observable<Photo>;

    // any to avoid ts identifying result of setInterval as Timer (from nodejs)
    private intervalId: any = -1;
    private currentPhotoSet = false;
    private hotkeys: Hotkey[] = [];

    constructor(
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
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.startRandomFetch(settings.randomDisplayDurationSeconds))
            );

        this.photos$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos),
                tap(photos => {
                    if (!this.currentPhotoSet) {
                        this.currentPhotoSet = true;
                        this.setCurrentPhoto(photos[0]);
                    }
                })
            );

        this.category$ = this._store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCurrentCategory),
            );

        this.activePhoto$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                tap(photo => {
                    this._store$
                        .pipe(
                            select(PhotoCategoryStoreSelectors.selectCategoryById(photo.categoryId)),
                            tap(category => this._store$.dispatch(new PhotoCategoryStoreActions.SetCurrentAction({ category: category }))),
                            take(1)
                        ).subscribe();
                })
            );

        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());
        this._store$.dispatch(new LayoutStoreActions.OpenRightSidebarRequestAction());

        // start by loading 10 images
        for (let i = 0; i < 10; i++) {
            this._store$.dispatch(new PhotoStoreActions.LoadRandomRequestAction());
        }
    }

    ngOnDestroy(): void {
        this._hotkeysService.remove(this.hotkeys);
        this._store$.dispatch(new LayoutStoreActions.CloseRightSidebarRequestAction());
    }

    onSelectPhoto(photo: Photo): void {
        this.setCurrentPhoto(photo);
    }

    private setCurrentPhoto(photo: Photo): void {
        this._store$.dispatch(new PhotoStoreActions.SetCurrentAction({ photo: photo }));
    }

    private startRandomFetch(delaySeconds: number): void {
        if (this.intervalId !== -1) {
            clearInterval(this.intervalId);
            this.intervalId = -1;
        }

        this.intervalId = setInterval(() => {
            this._store$.dispatch(new PhotoStoreActions.LoadRandomRequestAction());
        }, delaySeconds * 1000);
    }
}
