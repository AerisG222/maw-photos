import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { tap, first, map, filter } from 'rxjs/operators';

import { Category } from 'src/app/models/category.model';
import { PhotoCategoryStoreSelectors } from 'src/app/core/root-store';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';
import { Photo } from 'src/app/models/photo.model';
import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';

@Component({
    selector: 'app-photos-bulk-edit',
    templateUrl: './bulk-edit.component.html',
    styleUrls: ['./bulk-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkEditComponent implements OnInit {
    category$: Observable<Category> | null = null;
    photos$: Observable<Photo[]> | null = null;
    showPhotosWithGpsData$ = new BehaviorSubject<boolean>(true);
    selectedPhotos: Photo[] = [];

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.category$ = this.store
            .select(PhotoCategoryStoreSelectors.activeCategory)
            .pipe(
                filter(x => !!x),
                map(x => x as Category)
            );

        this.photos$ = combineLatest([
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
