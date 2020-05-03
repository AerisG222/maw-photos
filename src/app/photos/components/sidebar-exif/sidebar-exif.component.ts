import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';
import { ExifContainer } from 'src/app/models/exif-container';

@Component({
    selector: 'app-photos-sidebar-exif',
    templateUrl: './sidebar-exif.component.html',
    styleUrls: ['./sidebar-exif.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarExifComponent implements OnInit, OnDestroy {
    destroySub = new Subscription();
    exifContainer$: Observable<ExifContainer>;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.exifContainer$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoExifData),
                filter(exif => !!exif),
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
}