import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';

import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';
import { ExifContainer } from 'src/app/models/exif-container';
import { Photo } from 'src/app/models/photo.model';

@Component({
    selector: 'app-photos-sidebar-exif',
    templateUrl: './sidebar-exif.component.html',
    styleUrls: ['./sidebar-exif.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarExifComponent implements OnInit, OnDestroy {
    destroySub = new Subscription();
    exifContainer$: Observable<ExifContainer> | null = null;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.exifContainer$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectActivePhotoExifData),
                filter(exif => !!exif),
                map(exif => exif as ExifContainer)
            );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectActivePhoto),
                filter(photo => !!photo),
                map(photo => photo as Photo),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadExifRequest({ photoId: photo.id })))
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }
}
