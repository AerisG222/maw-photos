import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { Category } from 'src/app/core/models/category.model';
import { LayoutStoreActions, PhotoCategoryStoreSelectors, PhotoStoreSelectors } from 'src/app/core/root-store';
import { Photo } from 'src/app/core/models/photo.model';
import { sidebarInfoPanelShow, sidebarInfoPanelHide, toolbarShow } from '../animations';
import { GpsCoordinate } from 'src/app/core/models/gps-coordinate.model';

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

    constructor(
        private store$: Store<{}>
    ) {

    }

    ngOnInit(): void {
        this.category$ = this.store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCurrentCategoryAsCategory)
            );

        this.photos$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos)
            );
    }

    ngOnDestroy(): void {
        this.store$.dispatch(LayoutStoreActions.openRightSidebarRequest());
    }

    onShowPhotosWithGpsData(doShow: boolean): void {
        console.log(`show photos with gps data: ${ doShow }`);
    }

    onSelectAll(doSelectAll: boolean): void {
        console.log(`select all: ${ doSelectAll }`);
    }

    onSaveGps(gps: GpsCoordinate): void {
        console.log(`save coords: ${ gps }`);
    }

    onPhotoSelected(photo: Photo): void {
        console.log(`photo selected: ${photo.id}`);
    }

    onPhotoDeselected(photo: Photo): void {
        console.log(`photo deselected: ${photo.id}`);
    }
}
