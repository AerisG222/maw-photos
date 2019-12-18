import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

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
    exifData: ExifData[] = [];
    makerData: ExifData[] = [];
    compositeData: ExifData[] = [];

    constructor(
        private store$: Store<{}>
    ) {

    }

    ngOnInit(): void {
        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoExifData),
                tap(data => this.exifData = this.getFilteredData(data, ExifCategory.Exif)),
                tap(data => this.makerData = this.getFilteredData(data, ExifCategory.Maker)),
                tap(data => this.compositeData = this.getFilteredData(data, ExifCategory.Composite))
            ).subscribe()
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
