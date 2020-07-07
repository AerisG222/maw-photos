import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { PhotoStoreActions, PhotoStoreSelectors } from '../../store';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';
import { tap } from 'rxjs/operators';
import { Settings, DEFAULT_SETTINGS } from 'src/app/models/settings.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';

@Component({
    selector: 'app-photos-grid-view-toolbar',
    templateUrl: './grid-view-toolbar.component.html',
    styleUrls: ['./grid-view-toolbar.component.scss']
})
export class GridViewToolbarComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    settings: Settings | null = null;
    isFirst$: Observable<boolean> | null = null;
    isLast$: Observable<boolean> | null = null;

    constructor(private store$: Store) {

    }

    ngOnInit(): void {
        this.destroySub.add(this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings)
            ).subscribe()
        );

        this.isFirst$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoFirst)
            );

        this.isLast$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLast)
            );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onExitGridView(): void {
        this.store$.dispatch(PhotoStoreActions.exitGridViewRequest());
    }

    onMoveNext(): void {
        this.store$.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onMovePrevious(): void {
        this.store$.dispatch(PhotoStoreActions.movePreviousRequest());
    }

    onToggleSlideshow(): void {
        this.store$.dispatch(PhotoStoreActions.toggleSlideshowRequest());
    }

    onToggleCategoryBreadcrumbs(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoGridShowCategoryBreadcrumbsRequest());
    }

    onToggleMargins(): void {
        if (this.settings) {
            const newMargin = CategoryMargin.nextSize(this.settings.photoGridMargin.name);

            this.store$.dispatch(SettingsStoreActions.updatePhotoGridMarginRequest({ newMargin }));
        }
    }

    onToggleSize(): void {
        const name = this.settings?.photoGridThumbnailSize.name ?? DEFAULT_SETTINGS.photoGridThumbnailSize.name;
        const size = ThumbnailSize.nextSize(name);

        this.store$.dispatch(SettingsStoreActions.updatePhotoGridThumbnailSizeRequest({ newSize: size }));
    }
}
