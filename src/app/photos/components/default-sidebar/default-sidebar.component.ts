import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { sidebarShow, sidebarHide, sidebarCardShow, sidebarCardHide } from 'src/app/shared/animations';
import { SettingsStoreActions, SettingsStoreSelectors, AuthStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-photos-default-sidebar',
    templateUrl: './default-sidebar.component.html',
    styleUrls: ['./default-sidebar.component.scss'],
    animations: [
        trigger('sidebarFlyInOut', [
            transition(':enter', [
                useAnimation(sidebarShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarHide)
            ])
        ]),
        trigger('toggleInfoPanel', [
            transition(':enter', [
                useAnimation(sidebarCardShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarCardHide)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultSidebarComponent implements OnInit {
    isAdmin$: Observable<boolean>;
    endSidenavExpanded$: Observable<boolean>;
    showComments$: Observable<boolean>;
    showEffects$: Observable<boolean>;
    showExif$: Observable<boolean>;
    showRatings$: Observable<boolean>;
    showMinimap$: Observable<boolean>;
    showHistogram$: Observable<boolean>;
    showMetadataEditor$: Observable<boolean>;
    showCategoryTeaserChooser$: Observable<boolean>;
    enableButtons$: Observable<boolean>;

    constructor(
        private store$: Store
    ) { }

    ngOnInit(): void {
        this.isAdmin$ = this.store$.pipe(
            select(AuthStoreSelectors.selectIsAdmin)
        );

        this.enableButtons$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelExpandedState)
        );

        this.endSidenavExpanded$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelExpandedState)
        );

        this.showComments$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowComments)
        );

        this.showMetadataEditor$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowMetadataEditor)
        );

        this.showCategoryTeaserChooser$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowCategoryTeaserChooser)
        );

        this.showEffects$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowEffects)
        );

        this.showExif$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowExif)
        );

        this.showHistogram$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowHistogram)
        );

        this.showMinimap$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowMinimap)
        );

        this.showRatings$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowRatings)
        );
    }

    toggleSidebar(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelExpandedStateRequest());
    }

    toggleRatings(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelRatingsRequest());
    }

    toggleCategoryTeaserChooser(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelCategoryTeaserChooserRequest());
    }

    toggleComments(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelCommentsRequest());
    }

    toggleMetadataEditor(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelMetadataEditorRequest());
    }

    toggleExif(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelExifRequest());
    }

    toggleHistogram(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelHistogramRequest());
    }

    toggleEffects(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelEffectsRequest());
    }

    toggleMinimap(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelMinimapRequest());
    }
}
