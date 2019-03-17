import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, interval } from 'rxjs';
import { tap, take, takeUntil, filter } from 'rxjs/operators';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoEffects } from 'src/app/core/models/photo-effects.model';
import { Settings } from 'src/app/core/models/settings.model';
import { SlideshowControlService } from 'src/app/core/services/slideshow-control.service';
import {
    LayoutStoreActions,
    PhotoStoreActions,
    PhotoStoreSelectors,
    PhotoCategoryStoreActions,
    PhotoCategoryStoreSelectors,
    RootStoreState,
    SettingsStoreActions,
    SettingsStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-random',
    templateUrl: './random.component.html',
    styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit, OnDestroy {
    killFetch$ = new Subject<boolean>();
    settings$: Observable<Settings>;
    category$: Observable<PhotoCategory>;
    photos$: Observable<Photo[]>;
    activePhoto$: Observable<Photo>;
    effects$: Observable<PhotoEffects>;
    isFullscreen$: Observable<boolean>;

    private currentPhotoSet = false;

    constructor(
        private _store$: Store<RootStoreState.State>,
        private slideshowControlSvc: SlideshowControlService
    ) {

    }

    ngOnInit() {
        this._store$.dispatch(new PhotoStoreActions.ClearRequestAction());

        this.settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(x => this.killFetch$.next(true)),
                tap(settings => this.startRandomFetch(settings.photoListSlideshowDisplayDurationSeconds * 1000))
            );

        this.photos$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos),
                filter(photos => !!photos && photos.length > 0),
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
                filter(x => !!x),
                tap(photo => {
                    this._store$
                        .pipe(
                            select(PhotoCategoryStoreSelectors.selectCategoryById, { id: photo.categoryId }),
                            tap(category => this._store$.dispatch(new PhotoCategoryStoreActions.SetCurrentAction({ category: category }))),
                            take(1)
                        ).subscribe();
                })
            );

        this.effects$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoEffects)
            );

        this.isFullscreen$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsFullscreenView)
            );

        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());
        this._store$.dispatch(new LayoutStoreActions.OpenRightSidebarRequestAction());
        this._store$.dispatch(new PhotoStoreActions.LoadMultipleRandomRequestAction({ count: 10 }));
    }

    ngOnDestroy(): void {
        this.killFetch$.next(true);
        this._store$.dispatch(new LayoutStoreActions.ExitFullscreenRequestAction());
        this._store$.dispatch(new LayoutStoreActions.CloseRightSidebarRequestAction());
        this.setCurrentPhoto(null);
    }

    onSelectPhoto(photo: Photo): void {
        this.setCurrentPhoto(photo);
    }

    private setCurrentPhoto(photo: Photo): void {
        this._store$.dispatch(new PhotoStoreActions.SetCurrentAction({ photo: photo }));
    }

    private startRandomFetch(delay: number): void {
        interval(delay)
            .pipe(
                tap(x => this._store$.dispatch(new PhotoStoreActions.LoadRandomRequestAction())),
                takeUntil(this.killFetch$)
            ).subscribe();
    }
}
