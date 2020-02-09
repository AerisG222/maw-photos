import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';

import { ExifData } from 'src/app/core/models/exif-data.model';
import { ExifCategory } from 'src/app/core/models/exif-category.model';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-exif',
    templateUrl: './exif.component.html',
    styleUrls: ['./exif.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExifComponent implements OnInit, OnDestroy {
    destroySub = new Subscription();
    exifData$: Observable<ExifData[]>;
    makerData$: Observable<ExifData[]>;
    compositeData$: Observable<ExifData[]>;

    constructor(
        private store$: Store<{}>
    ) {

    }

    ngOnInit(): void {
        this.exifData$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoExifData),
                map(data => this.getFilteredData(data, ExifCategory.Exif))
            );

        this.makerData$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoExifData),
                map(data => this.getFilteredData(data, ExifCategory.Maker))
            );

        this.makerData$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoExifData),
                map(data => this.getFilteredData(data, ExifCategory.Composite))
            );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(photo => !!photo),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadExifRequest({ photoId: photo.id })))
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    getFilteredData(data: ExifData[], category: ExifCategory): ExifData[] {
        if (!!data) {
            return data.filter(e => e.category === category);
        }

        return [];
    }
}
