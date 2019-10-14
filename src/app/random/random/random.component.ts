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
        private store$: Store<RootStoreState.State>,
        private slideshowControlSvc: SlideshowControlService
    ) {

    }

    ngOnInit() {
        this.store$.dispatch(PhotoStoreActions.clearRequest());

        this.settings$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(x => this.killFetch$.next(true)),
                tap(settings => this.startRandomFetch(settings.photoListSlideshowDisplayDurationSeconds * 1000))
            );

        this.photos$ = this.store$
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

        this.category$ = this.store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCurrentCategory),
            );

        this.activePhoto$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(x => !!x),
                tap(photo => {
                    this.store$
                        .pipe(
                            select(PhotoCategoryStoreSelectors.selectCategoryById, { id: photo.categoryId }),
                            tap(category => this.store$.dispatch(PhotoCategoryStoreActions.setCurrent({ category }))),
                            take(1)
                        ).subscribe();
                })
            );

        this.effects$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoEffects)
            );

        this.isFullscreen$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsFullscreenView)
            );

        this.store$.dispatch(SettingsStoreActions.loadRequest());
        this.store$.dispatch(LayoutStoreActions.openRightSidebarRequest());
        this.store$.dispatch(PhotoStoreActions.loadMultipleRandomRequest({ count: 10 }));
    }

    ngOnDestroy(): void {
        this.killFetch$.next(true);
        this.store$.dispatch(LayoutStoreActions.exitFullscreenRequest());
        this.store$.dispatch(LayoutStoreActions.closeRightSidebarRequest());
        this.setCurrentPhoto(null);
    }

    onSelectPhoto(photo: Photo): void {
        this.setCurrentPhoto(photo);
    }

    private setCurrentPhoto(photo: Photo): void {
        this.store$.dispatch(PhotoStoreActions.setCurrent({ photo }));
    }

    private startRandomFetch(delay: number): void {
        interval(delay)
            .pipe(
                tap(x => this.store$.dispatch(PhotoStoreActions.loadRandomRequest())),
                takeUntil(this.killFetch$)
            ).subscribe();
    }
}
