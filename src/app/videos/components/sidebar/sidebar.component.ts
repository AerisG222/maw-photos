import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { transition, useAnimation, trigger } from '@angular/animations';

import { sidebarShow, sidebarHide, sidebarCardShow, sidebarCardHide } from '@shared/animations';
import { SettingsStoreActions, SettingsStoreSelectors, AuthStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-videos-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
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
export class SidebarComponent {
    isAdmin$ = this.store.select(AuthStoreSelectors.isAdmin);
    endSidenavExpanded$ = this.store.select(SettingsStoreSelectors.videoInfoPanelExpandedState);
    showComments$ = this.store.select(SettingsStoreSelectors.videoInfoPanelShowComments);
    showRatings$ = this.store.select(SettingsStoreSelectors.videoInfoPanelShowRatings);
    showMinimap$ = this.store.select(SettingsStoreSelectors.videoInfoPanelShowMinimap);
    showMetadataEditor$ = this.store.select(SettingsStoreSelectors.videoInfoPanelShowMetadataEditor);
    showCategoryTeaserChooser$ = this.store.select(SettingsStoreSelectors.videoInfoPanelShowCategoryTeaserChooser);
    enableButtons$ = this.store.select(SettingsStoreSelectors.videoInfoPanelExpandedState);

    constructor(
        private store: Store
    ) { }

    toggleSidebar(): void {
        this.store.dispatch(SettingsStoreActions.toggleVideoInfoPanelExpandedStateRequest());
    }

    toggleRatings(): void {
        this.store.dispatch(SettingsStoreActions.toggleVideoInfoPanelRatingsRequest());
    }

    toggleCategoryTeaserChooser(): void {
        this.store.dispatch(SettingsStoreActions.toggleVideoInfoPanelCategoryTeaserChooserRequest());
    }

    toggleComments(): void {
        this.store.dispatch(SettingsStoreActions.toggleVideoInfoPanelCommentsRequest());
    }

    toggleMetadataEditor(): void {
        this.store.dispatch(SettingsStoreActions.toggleVideoInfoPanelMetadataEditorRequest());
    }

    toggleMinimap(): void {
        this.store.dispatch(SettingsStoreActions.toggleVideoInfoPanelMinimapRequest());
    }
}
