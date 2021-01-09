import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { tap, first, map, filter } from 'rxjs/operators';

import { PhotoCategoryStoreSelectors } from 'src/app/core/root-store';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/core/root-store/photos-store';
import { Photo } from '@models/photo.model';
import { GpsCoordinate } from '@models/gps-coordinate.model';

@Component({
    selector: 'app-photos-bulk-edit',
    templateUrl: './bulk-edit.component.html',
    styleUrls: ['./bulk-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkEditComponent {
    selectedPhotos: Photo[] = [];
    showPhotosWithGpsData$ = new BehaviorSubject<boolean>(true);
    category$ = this.store.select(PhotoCategoryStoreSelectors.activeCategory);
    photos$ = combineLatest([
            this.store.select(PhotoStoreSelectors.allPhotos),
            this.showPhotosWithGpsData$
        ])
        .pipe(
            map(([ photos, showPhotosWithGpsData ]) => {
                if (showPhotosWithGpsData) {
                    return photos;
                } else {
                    return photos.filter(p => p.latitude == null || p.longitude == null);
                }
            })
        );

    constructor(
        private store: Store
    ) {

    }

    onShowPhotosWithGpsData(doShow: boolean): void {
        // LAZY: let's just remove any selection when we change this setting to make sure
        // a user does not actually save a change for something that is not visible
        this.clearSelectedPhotos();

        this.showPhotosWithGpsData$.next(doShow);
    }

    onSelectAll(doSelectAll: boolean): void {
        this.clearSelectedPhotos();

        if (!!this.photos$ && doSelectAll) {
            this.photos$.pipe(
                filter(photos => !!photos),
                first(),
                map(photos => photos as Photo[]),
                tap(photos => this.selectedPhotos.push(...photos))
            ).subscribe();
        }
    }

    onSaveGps(gps: GpsCoordinate): void {
        const photosToUpdate = [...this.selectedPhotos];

        // LAZY (part 2): assume success, this will make sure photos that end up w/ gps data
        // which now might be hidden are removed from our list so they are not updated later
        this.clearSelectedPhotos();

        for (const photo of photosToUpdate) {
            this.store.dispatch(PhotoStoreActions.setGpsCoordinateOverrideRequest({ photoId: photo.id, latLng: gps }));
        }
    }

    onPhotoSelected(photo: Photo): void {
        const index = this.getSelectedIndex(photo);

        if (index < 0) {
            this.selectedPhotos.push(photo);
        }
    }

    onPhotoDeselected(photo: Photo): void {
        const index = this.getSelectedIndex(photo);

        if (index >= 0) {
            this.selectedPhotos.splice(index, 1);
        }
    }

    private getSelectedIndex(photo: Photo): number {
        return this.selectedPhotos.findIndex(p => p.id === photo.id);
    }

    private clearSelectedPhotos(): void {
        this.selectedPhotos = [];
    }
}
