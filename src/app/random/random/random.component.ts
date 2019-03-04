import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

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
    settings$: Observable<Settings>;
    category$: Observable<PhotoCategory>;
    photos$: Observable<Photo[]>;
    activePhoto$: Observable<Photo>;
    effects$: Observable<PhotoEffects>;

    // any to avoid ts identifying result of setInterval as Timer (from nodejs)
    private intervalId: any = -1;
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
                tap(settings => this.startRandomFetch(settings.photoListSlideshowDisplayDurationSeconds))
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

        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());
        this._store$.dispatch(new LayoutStoreActions.OpenRightSidebarRequestAction());
        this._store$.dispatch(new PhotoStoreActions.LoadMultipleRandomRequestAction({ count: 10 }));
    }

    ngOnDestroy(): void {
        this._store$.dispatch(new LayoutStoreActions.CloseRightSidebarRequestAction());
        this.setCurrentPhoto(null);
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
