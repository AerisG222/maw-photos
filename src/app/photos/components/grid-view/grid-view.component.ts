 import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { SettingsStoreSelectors, PhotoCategoryStoreSelectors } from 'src/app/core/root-store';
import { Category } from 'src/app/models/category.model';
import { PhotoStoreSelectors, PhotoStoreActions } from '../../store';
import { Photo } from 'src/app/models/photo.model';
import { Settings } from 'src/app/models/settings.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';
import { ToolbarComponent } from 'src/app/layout/toolbar/toolbar.component';

@Component({
    selector: 'app-photos-grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit, OnDestroy {
    @ViewChild(ToolbarComponent) layout: ToolbarComponent | null = null;

    settings$: Observable<Settings> | null = null;
    category$: Observable<Category> | null = null;
    photos$: Observable<Photo[]> | null = null;
    activePhoto$: Observable<Photo | null> | null = null;
    thumbnailSize$: Observable<ThumbnailSize> | null = null;
    margin$: Observable<CategoryMargin> | null = null;
    showBreadcrumbs$: Observable<boolean> | null = null;
    lastScrollTop = 0;

    constructor(private store: Store) {

    }

    ngOnInit(): void {
        this.clearActivePhoto();

        this.settings$ = this.store.select(SettingsStoreSelectors.settings);

        this.category$ = this.store
            .select(PhotoCategoryStoreSelectors.activeCategory)
            .pipe(
                filter(x => !!x),
                map(x => x as Category)
            );

        this.photos$ = this.store.select(PhotoStoreSelectors.allPhotos);
        this.activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
        this.thumbnailSize$ = this.store.select(SettingsStoreSelectors.photoGridThumbnailSize);
        this.margin$ = this.store.select(SettingsStoreSelectors.photoGridMargin);
        this.showBreadcrumbs$ = this.store.select(SettingsStoreSelectors.photoGridShowCategoryBreadcrumbs);
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
