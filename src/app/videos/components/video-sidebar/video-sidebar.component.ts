import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { transition, useAnimation, trigger } from '@angular/animations';

import { sidebarShow, sidebarHide, sidebarCardShow, sidebarCardHide } from 'src/app/shared/animations';
import { MinimapMode } from 'src/app/shared/minimap/minimap-mode.model';
import { RatingMode } from 'src/app/shared/rating/rating-mode.model';
import { SettingsStoreActions, SettingsStoreSelectors, AuthStoreSelectors } from 'src/app/core/root-store';
import { CategoryTeaserChooserMode } from 'src/app/shared/category-teaser-chooser/category-teaser-chooser-mode.model';

@Component({
    selector: 'app-video-sidebar',
    templateUrl: './video-sidebar.component.html',
    styleUrls: ['./video-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('sidebarFlyInOut', [
            transition(':enter', [
                useAnimation(sidebarShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarHide)
            ])
        ]),
        trigger('sidebarCardShowHide', [
            transition(':enter', [
                useAnimation(sidebarCardShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarCardHide)
            ])
        ])
    ]
})
export class VideoSidebarComponent implements OnInit {
    minimapMode = MinimapMode;
    ratingMode = RatingMode;
    categoryTeaserChooserMode = CategoryTeaserChooserMode;

    isAdmin$: Observable<boolean>;
    endSidenavExpanded$: Observable<boolean>;
    showComments$: Observable<boolean>;
    showRatings$: Observable<boolean>;
    showMinimap$: Observable<boolean>;
    minimapUseDarkTheme$: Observable<boolean>;
    showMetadataEditor$: Observable<boolean>;
    showCategoryTeaserChooser$: Observable<boolean>;
    enableButtons$: Observable<boolean>;

    constructor(
        private store$: Store
    ) { }

    ngOnInit() {
        this.isAdmin$ = this.store$.pipe(
            select(AuthStoreSelectors.selectIsAdmin)
        );

        this.enableButtons$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelExpandedState)
        );

        this.endSidenavExpanded$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelExpandedState)
        );

        this.showCategoryTeaserChooser$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowCategoryTeaserChooser)
        );

        this.showComments$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowComments)
        );

        this.showMetadataEditor$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowMetadataEditor)
        );

        this.showMinimap$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowMinimap)
        );

        this.showRatings$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowRatings)
        );
    }

    toggleSidebar(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelExpandedStateRequest());
    }

    toggleRatings(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelRatingsRequest());
    }

    toggleCategoryTeaserChooser(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelCategoryTeaserChooserRequest());
    }

    toggleComments(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelCommentsRequest());
    }

    toggleMetadataEditor(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelMetadataEditorRequest());
    }

    toggleMinimap(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelMinimapRequest());
    }

    private togglePanel(showPanel$: Observable<boolean>, toggleFunc: () => void): void {
        combineLatest([
            this.endSidenavExpanded$,
            showPanel$
        ]).pipe(
            filter(x => x[0] != null && x[1] != null),
            take(1),
            map(x => {
                if (!x[0]) {
                    // show info panel if hidden
                    this.toggleSidebar();

                    if (!x[1]) {
                        // if detail panel hidden, make sure we show this too
                        toggleFunc();
                    }
                } else {
                    toggleFunc();
                }
            })
        ).subscribe();
    }
}
