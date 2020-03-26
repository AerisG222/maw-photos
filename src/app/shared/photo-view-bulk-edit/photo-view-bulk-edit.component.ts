import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { tap, first, map } from 'rxjs/operators';

import { Category } from 'src/app/core/models/category.model';
import { LayoutStoreActions, PhotoCategoryStoreSelectors, PhotoStoreSelectors, PhotoStoreActions } from 'src/app/core/root-store';
import { Photo } from 'src/app/core/models/photo.model';
import { sidebarCardShow, sidebarCardHide, toolbarShow } from '../animations';
import { GpsCoordinate } from 'src/app/core/models/gps-coordinate.model';

@Component({
    selector: 'app-photo-view-bulk-edit',
    templateUrl: './photo-view-bulk-edit.component.html',
    styleUrls: ['./photo-view-bulk-edit.component.scss'],
    animations: [
        trigger('toggleInfoPanel', [
            transition(':enter', [
                useAnimation(sidebarCardShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarCardHide)
            ])
        ]),
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ]
})
export class PhotoViewBulkEditComponent implements OnInit {
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    showPhotosWithGpsData$ = new BehaviorSubject<boolean>(true);
    selectedPhotos: Photo[] = [];

    constructor(
        private store$: Store
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

    onShowPhotosWithGpsData(doShow: boolean): void {
        // LAZY: let's just remove any selection when we change this setting to make sure
        // a user does not actually save a change for something that is not visible
        this.onSelectAll(false);

        this.showPhotosWithGpsData$.next(doShow);
    }

    onSelectAll(doSelectAll: boolean): void {
        this.selectedPhotos = [];

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
