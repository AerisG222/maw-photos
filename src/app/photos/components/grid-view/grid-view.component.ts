import { Component, OnInit, OnDestroy, ContentChild, ViewChild } from '@angular/core';
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
import { ContentMarginComponent } from 'src/app/shared/content-margin/content-margin.component';
import { ToolbarComponent } from 'src/app/layout/toolbar/toolbar.component';

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
    showBreadcrumbs$: Observable<boolean> | null = null;
    lastScrollTop = 0;

    @ViewChild(ToolbarComponent) layout: ToolbarComponent | null = null;

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

    getSourceset(photo: Photo | null): string {
        if (!!photo) {
            return `${photo.imageMd.url} ${photo.imageMd.width}w, ${photo.imageLg.url} ${photo.imageLg.width}w`;
        }

        return '';
    }

    setCurrentPhoto(photo: Photo): void {
        if (!!this.layout) {
            this.lastScrollTop = this.layout.getCurrentScrollTop();
        }

        this.store$.dispatch(PhotoStoreActions.setCurrent({ photo }));
    }

    clearCurrentPhoto(): void {
        this.store$.dispatch(PhotoStoreActions.clearCurrent());

        if (!!this.layout) {
            this.layout.setCurrentScrollTop(this.lastScrollTop);
        }
    }

    onSwipeLeft(): void {
        this.store$.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onSwipeRight(): void {
        this.store$.dispatch(PhotoStoreActions.movePreviousRequest());
    }
}
