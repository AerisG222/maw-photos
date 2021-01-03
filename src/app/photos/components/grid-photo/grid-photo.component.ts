import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoCategoryStoreSelectors, PhotoStoreActions, PhotoStoreSelectors, SettingsStoreSelectors } from 'src/app/core/root-store';
import { Photo } from 'src/app/models/photo.model';

@Component({
    selector: 'app-grid-photo',
    templateUrl: './grid-photo.component.html',
    styleUrls: ['./grid-photo.component.scss']
})
export class GridPhotoComponent implements OnInit {
    category$ = this.store.select(PhotoCategoryStoreSelectors.activeCategory);
    settings$ = this.store.select(SettingsStoreSelectors.settings);
    photos$ = this.store.select(PhotoStoreSelectors.allPhotos);
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    thumbnailSize$ = this.store.select(SettingsStoreSelectors.photoGridThumbnailSize);
    margin$ = this.store.select(SettingsStoreSelectors.photoGridMargin);
    showBreadcrumbs$ = this.store.select(SettingsStoreSelectors.photoGridShowCategoryBreadcrumbs);

    constructor(private store: Store) {
        console.log('b');
    }

    ngOnInit(): void {
    }

    getSourceset(photo: Photo | null): string {
        if (!!photo) {
            return `${photo.imageMd.url} ${photo.imageMd.width}w, ${photo.imageLg.url} ${photo.imageLg.width}w`;
        }

        return '';
    }

    onSwipeLeft(): void {
        this.store.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onSwipeRight(): void {
        this.store.dispatch(PhotoStoreActions.movePreviousRequest());
    }
}
