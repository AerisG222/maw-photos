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

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
    destroy$ = new Subject<boolean>();
    settings$: Observable<Settings>;
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    activePhoto$: Observable<Photo>;
    effects$: Observable<PhotoEffects>;

    private isSlideshowPlaying = false;
    private intervalId: number = null;
    private slideshowDuration: number;
    private hotkeys: Hotkey[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) {

    }

    ngOnInit() {
        this._store$.dispatch(new PhotoStoreActions.ClearRequestAction());

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

        this._store$
            .pipe(
                select(PhotoStoreSelectors.selectSlideshowIsPlaying),
                tap(isPlaying => this.isSlideshowPlaying = isPlaying),
                tap(isPlaying => isPlaying ? this.startSlideshow() : this.stopSlideshow()),
                takeUntil(this.destroy$)
            ).subscribe();

        this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLast),
                map(x => {
                    if (this.isSlideshowPlaying) {
                        this._store$.dispatch(new PhotoStoreActions.ToggleSlideshowRequestAction());
                    }
                }),
                takeUntil(this.destroy$)
            ).subscribe();

        this.settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.slideshowDuration = settings.randomDisplayDurationSeconds * 1000)
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
        this._hotkeysService.remove(this.hotkeys);
        this._store$.dispatch(new LayoutStoreActions.CloseRightSidebarRequestAction());
        this.destroy$.next(true);

        this.stopSlideshow();
    }

    onSelectPhoto(photo: Photo): void {
        this.setCurrentPhoto(photo);
    }

    private setCurrentPhoto(photo: Photo): void {
        this._store$.dispatch(new PhotoStoreActions.SetCurrentAction({ photo: photo }));
    }

    private startSlideshow(): void {
        this.intervalId = window.setInterval(() => {
            this._store$.dispatch(new PhotoStoreActions.MoveNextRequestAction());
        }, this.slideshowDuration);
    }

    private stopSlideshow(): void {
        if (this.intervalId != null) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
