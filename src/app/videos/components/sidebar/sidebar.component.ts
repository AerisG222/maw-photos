import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { transition, useAnimation, trigger } from '@angular/animations';

import { sidebarShow, sidebarHide, sidebarCardShow, sidebarCardHide } from 'src/app/shared/animations';
import { SettingsStoreActions, SettingsStoreSelectors, AuthStoreSelectors } from 'src/app/core/root-store';

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
export class SidebarComponent implements OnInit {
    isAdmin$: Observable<boolean> | null = null;
    endSidenavExpanded$: Observable<boolean> | null = null;
    showComments$: Observable<boolean> | null = null;
    showRatings$: Observable<boolean> | null = null;
    showMinimap$: Observable<boolean> | null = null;
    minimapUseDarkTheme$: Observable<boolean> | null = null;
    showMetadataEditor$: Observable<boolean> | null = null;
    showCategoryTeaserChooser$: Observable<boolean> | null = null;
    enableButtons$: Observable<boolean> | null = null;

    constructor(
        private store: Store
    ) { }

    ngOnInit(): void {
        this.isAdmin$ = this.store.select(AuthStoreSelectors.selectIsAdmin);
        this.enableButtons$ = this.store.select(SettingsStoreSelectors.selectVideoInfoPanelExpandedState);
        this.endSidenavExpanded$ = this.store.select(SettingsStoreSelectors.selectVideoInfoPanelExpandedState);
        this.showCategoryTeaserChooser$ = this.store.select(SettingsStoreSelectors.selectVideoInfoPanelShowCategoryTeaserChooser);
        this.showComments$ = this.store.select(SettingsStoreSelectors.selectVideoInfoPanelShowComments);
        this.showMetadataEditor$ = this.store.select(SettingsStoreSelectors.selectVideoInfoPanelShowMetadataEditor);
        this.showMinimap$ = this.store.select(SettingsStoreSelectors.selectVideoInfoPanelShowMinimap);
        this.showRatings$ = this.store.select(SettingsStoreSelectors.selectVideoInfoPanelShowRatings);
    }

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
