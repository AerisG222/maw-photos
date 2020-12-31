 import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreSelectors, PhotoCategoryStoreSelectors } from 'src/app/core/root-store';
import { PhotoStoreSelectors, PhotoStoreActions } from '../../../core/root-store/photos-store';
import { Photo } from 'src/app/models/photo.model';
import { ToolbarComponent } from 'src/app/layout/toolbar/toolbar.component';

@Component({
    selector: 'app-photos-grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit, OnDestroy {
    @ViewChild(ToolbarComponent) layout: ToolbarComponent | null = null;

    lastScrollTop = 0;
    category$ = this.store.select(PhotoCategoryStoreSelectors.activeCategory);
    settings$ = this.store.select(SettingsStoreSelectors.settings);
    photos$ = this.store.select(PhotoStoreSelectors.allPhotos);
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    thumbnailSize$ = this.store.select(SettingsStoreSelectors.photoGridThumbnailSize);
    margin$ = this.store.select(SettingsStoreSelectors.photoGridMargin);
    showBreadcrumbs$ = this.store.select(SettingsStoreSelectors.photoGridShowCategoryBreadcrumbs);

    constructor(private store: Store) {

    }

    ngOnInit(): void {
        this.clearActivePhoto();
    }

    ngOnDestroy(): void {
        this.clearActivePhoto();
    }

    getSourceset(photo: Photo | null): string {
        if (!!photo) {
            return `${photo.imageMd.url} ${photo.imageMd.width}w, ${photo.imageLg.url} ${photo.imageLg.width}w`;
        }

        return '';
    }

    setActivePhoto(photo: Photo): void {
        if (!!this.layout) {
            this.lastScrollTop = this.layout.getCurrentScrollTop();
        }

        this.store.dispatch(PhotoStoreActions.setActivePhotoId({ id: photo.id }));
    }

    clearActivePhoto(): void {
        this.store.dispatch(PhotoStoreActions.unsetActivePhotoId());

        if (!!this.layout) {
            this.layout.setCurrentScrollTop(this.lastScrollTop);
        }
    }

    onSwipeLeft(): void {
        this.store.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onSwipeRight(): void {
        this.store.dispatch(PhotoStoreActions.movePreviousRequest());
    }
}
