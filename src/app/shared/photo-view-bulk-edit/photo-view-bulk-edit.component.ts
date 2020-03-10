import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { Category } from 'src/app/core/models/category.model';
import { LayoutStoreActions, PhotoCategoryStoreSelectors, PhotoStoreSelectors, PhotoStoreActions } from 'src/app/core/root-store';
import { Photo } from 'src/app/core/models/photo.model';
import { sidebarInfoPanelShow, sidebarInfoPanelHide, toolbarShow } from '../animations';
import { GpsCoordinate } from 'src/app/core/models/gps-coordinate.model';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { tap, first, map } from 'rxjs/operators';

@Component({
    selector: 'app-photo-view-bulk-edit',
    templateUrl: './photo-view-bulk-edit.component.html',
    styleUrls: ['./photo-view-bulk-edit.component.scss'],
    animations: [
        trigger('toggleInfoPanel', [
            transition(':enter', [
                useAnimation(sidebarInfoPanelShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarInfoPanelHide)
            ])
        ]),
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ]
})
export class PhotoViewBulkEditComponent implements OnInit, OnDestroy {
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    showPhotosWithGpsData$ = new BehaviorSubject<boolean>(true);
    selectedPhotos: Photo[] = [];

    constructor(
        private store$: Store<{}>
    ) {

    }

    ngOnInit(): void {
        this.category$ = this.store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCurrentCategoryAsCategory)
            );

        this.photos$ = combineLatest([
                this.store$
                    .pipe(
                        select(PhotoStoreSelectors.selectAllPhotos)
                    ),
                this.showPhotosWithGpsData$
            ])
            .pipe(
                map(parts => {
                    if(parts[1]) {
                        return parts[0]
                    } else {
                        return parts[0].filter(p => p.latitude == null || p.longitude == null);
                    }
                })
            )
    }

    ngOnDestroy(): void {
        this.store$.dispatch(LayoutStoreActions.openRightSidebarRequest());
    }

    onShowPhotosWithGpsData(doShow: boolean): void {
        this.showPhotosWithGpsData$.next(doShow);

        // LAZY: let's just remove any selection when we change this setting to make sure
        // a user does not actually save a change for something that is not visible
        this.onSelectAll(false);
    }

    onSelectAll(doSelectAll: boolean): void {
        this.selectedPhotos.splice(0);

        if(doSelectAll) {
            combineLatest([
                this.photos$
            ]).pipe(
                first(),
                tap(photos => this.selectedPhotos.push(...photos[0]))
            ).subscribe();
        }
    }

    onSaveGps(gps: GpsCoordinate): void {
        const photosToUpdate = [...this.selectedPhotos];

        for(const photo of photosToUpdate) {
            this.store$.dispatch(PhotoStoreActions.setGpsCoordinateOverrideRequest({ photoId: photo.id, latLng: gps }));
        }
    }

    onPhotoSelected(photo: Photo): void {
        const index = this.getSelectedIndex(photo);

        if(index < 0) {
            this.selectedPhotos.push(photo);
        }
    }

    onPhotoDeselected(photo: Photo): void {
        const index = this.getSelectedIndex(photo);

        if(index >= 0) {
            this.selectedPhotos.splice(index, 1);
        }
    }

    private getSelectedIndex(photo: Photo): number {
        return this.selectedPhotos.findIndex(p => p.id === photo.id);
    }
}
