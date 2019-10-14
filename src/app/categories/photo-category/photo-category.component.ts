import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

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
import { MapImage } from 'src/app/core/models/map-image.model';

@Component({
    selector: 'app-photo-category',
    templateUrl: './photo-category.component.html',
    styleUrls: ['./photo-category.component.scss']
})
export class PhotoCategoryComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    settings$: Observable<Settings>;
    category$: Observable<PhotoCategory>;
    photos$: Observable<Photo[]>;
    activePhoto$: Observable<Photo>;
    effects$: Observable<PhotoEffects>;
    isFullscreen$: Observable<boolean>;
    isMapView$: Observable<boolean>;
    mapImages$: Observable<MapImage[]>;

    constructor(
        private route: ActivatedRoute,
        private slideshowControlSvc: SlideshowControlService,
        private store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.settings$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            );

        this.category$ = this.store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCurrentCategory)
            );

        this.photos$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos),
                tap(photos => this.setCurrentPhoto(photos[0]))
            );

        this.mapImages$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectPhotosWithGpsCoordinates),
                map(photos => photos.map(x => ({
                    id: x.id,
                    imageUrl: x.imageXsSq.url,
                    latitude: x.latitude,
                    longitude: x.longitude
                })))
            );

        this.isFullscreen$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsFullscreenView)
            );

        this.isMapView$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsMapView)
            );

        this.activePhoto$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(x => !!x)
            );

        this.effects$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoEffects),
                filter(x => !!x)
            );

        this.store$.dispatch(PhotoStoreActions.clearRequest());
        this.store$.dispatch(SettingsStoreActions.loadRequest());
        this.store$.dispatch(LayoutStoreActions.openRightSidebarRequest());

        this.destroySub.add(this.route.params
            .pipe(
                map(p => Number(p.id)),
                tap(id => this.store$.dispatch(PhotoCategoryStoreActions.setCurrentById({ categoryId: id }))),
                tap(id => this.store$.dispatch(PhotoStoreActions.loadRequest({ categoryId: id })))
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.store$.dispatch(LayoutStoreActions.exitFullscreenRequest());
        this.store$.dispatch(LayoutStoreActions.closeRightSidebarRequest());
        this.destroySub.unsubscribe();
        this.setCurrentPhoto(null);
    }

    onSelectPhoto(photo: Photo): void {
        this.setCurrentPhoto(photo);
    }

    private setCurrentPhoto(photo: Photo): void {
        this.store$.dispatch(PhotoStoreActions.setCurrent({ photo }));
    }
}
