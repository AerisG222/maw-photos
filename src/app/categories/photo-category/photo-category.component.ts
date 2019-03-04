import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, flatMap, tap, takeUntil } from 'rxjs/operators';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoEffects } from 'src/app/core/models/photo-effects.model';
import { Settings } from 'src/app/core/models/settings.model';
import { SlideshowControlService } from 'src/app/core/services/slideshow-control.service';
import {
    LayoutStoreActions,
    RootStoreState,
    PhotoCategoryStoreActions,
    PhotoCategoryStoreSelectors,
    PhotoStoreSelectors, PhotoStoreActions,
    SettingsStoreSelectors,
    SettingsStoreActions
} from 'src/app/core/root-store';

@Component({
    selector: 'app-photo-category',
    templateUrl: './photo-category.component.html',
    styleUrls: ['./photo-category.component.scss']
})
export class PhotoCategoryComponent implements OnInit, OnDestroy {
    destroy$ = new Subject<boolean>();
    settings$: Observable<Settings>;
    category$: Observable<PhotoCategory>;
    photos$: Observable<Photo[]>;
    activePhoto$: Observable<Photo>;
    effects$: Observable<PhotoEffects>;
    isFullscreen$: Observable<boolean>;

    constructor(
        private _route: ActivatedRoute,
        private slideshowControlSvc: SlideshowControlService,
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this._store$.dispatch(new PhotoStoreActions.ClearRequestAction());

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
                        select(PhotoCategoryStoreSelectors.selectCategoryById, { id: id }),
                        tap(category => this._store$.dispatch(new PhotoCategoryStoreActions.SetCurrentAction({ category: category })))
                    )
                )
            );

        this.photos$ = categoryId$
            .pipe(
                flatMap(id => this._store$
                    .pipe(
                        select(PhotoStoreSelectors.selectPhotosForCategory, { id: id })
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
        this._store$.dispatch(new LayoutStoreActions.CloseRightSidebarRequestAction());
        this.destroy$.next(true);
        this.setCurrentPhoto(null);
    }

    onSelectPhoto(photo: Photo): void {
        this.setCurrentPhoto(photo);
    }

    private setCurrentPhoto(photo: Photo): void {
        this._store$.dispatch(new PhotoStoreActions.SetCurrentAction({ photo: photo }));
    }
}
