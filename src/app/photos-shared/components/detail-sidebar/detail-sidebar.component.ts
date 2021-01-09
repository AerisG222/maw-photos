import { Component, ChangeDetectionStrategy } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Store } from '@ngrx/store';

import { sidebarShow, sidebarHide, sidebarCardShow, sidebarCardHide } from 'src/app/shared/animations';
import { SettingsStoreActions, SettingsStoreSelectors, AuthStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-photos-detail-sidebar',
    templateUrl: './detail-sidebar.component.html',
    styleUrls: ['./detail-sidebar.component.scss'],
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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailSidebarComponent {
    isAdmin$ = this.store.select(AuthStoreSelectors.isAdmin);
    endSidenavExpanded$ = this.store.select(SettingsStoreSelectors.photoInfoPanelExpandedState);
    showComments$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowComments);
    showEffects$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowEffects);
    showExif$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowExif);
    showRatings$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowRatings);
    showMinimap$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowMinimap);
    showHistogram$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowHistogram);
    showMetadataEditor$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowMetadataEditor);
    showCategoryTeaserChooser$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowCategoryTeaserChooser);
    enableButtons$ = this.store.select(SettingsStoreSelectors.photoInfoPanelExpandedState);

    constructor(
        private store: Store
    ) { }

    toggleSidebar(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoInfoPanelExpandedStateRequest());
    }

    toggleRatings(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoInfoPanelRatingsRequest());
    }

    toggleCategoryTeaserChooser(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoInfoPanelCategoryTeaserChooserRequest());
    }

    toggleComments(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoInfoPanelCommentsRequest());
    }

    toggleMetadataEditor(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoInfoPanelMetadataEditorRequest());
    }

    toggleExif(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoInfoPanelExifRequest());
    }

    toggleHistogram(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoInfoPanelHistogramRequest());
    }

    toggleEffects(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoInfoPanelEffectsRequest());
    }

    toggleMinimap(): void {
        this.store.dispatch(SettingsStoreActions.togglePhotoInfoPanelMinimapRequest());
    }
}
