import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { SettingsStoreSelectors, PhotoCategoryStoreSelectors } from 'src/app/core/root-store';
import { Category } from 'src/app/models/category.model';
import { PhotoStoreSelectors, PhotoStoreActions } from '../../store';
import { Photo } from 'src/app/models/photo.model';
import { Settings } from 'src/app/models/settings.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';

@Component({
    selector: 'app-photos-grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit, OnDestroy {
    settings$: Observable<Settings> | null = null;
    category$: Observable<Category> | null = null;
    photos$: Observable<Photo[]> | null = null;
    currentPhoto$: Observable<Photo | null> | null = null;
    thumbnailSize$: Observable<ThumbnailSize> | null = null;
    margin$: Observable<CategoryMargin> | null = null;
    showBreadcrumbs$: Observable<boolean> | null =null;

    constructor(private store$: Store) {

    }

    ngOnInit(): void {
        this.clearCurrentPhoto();

        this.settings$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            );

        this.category$ = this.store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCurrentCategory),
                filter(x => !!x),
                map(x => x as Category)
            );

        this.photos$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos)
            );

        this.currentPhoto$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto)
            );

        this.thumbnailSize$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectPhotoGridThumbnailSize)
            );

        this.margin$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectPhotoGridMargin)
            );

        this.showBreadcrumbs$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectPhotoGridShowCategoryBreadcrumbs)
            );
    }

    ngOnDestroy(): void {
        this.clearCurrentPhoto();
    }

    setCurrentPhoto(photo: Photo): void {
        this.store$.dispatch(PhotoStoreActions.setCurrent({ photo }));
    }

    clearCurrentPhoto(): void {
        this.store$.dispatch(PhotoStoreActions.clearCurrent());
    }

    onSwipeLeft(): void {
        this.store$.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onSwipeRight(): void {
        this.store$.dispatch(PhotoStoreActions.movePreviousRequest());
    }
}
