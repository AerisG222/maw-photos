import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Store } from '@ngrx/store';
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
export class DefaultSidebarComponent implements OnInit {
    isAdmin$: Observable<boolean> | null = null;
    endSidenavExpanded$: Observable<boolean> | null = null;
    showComments$: Observable<boolean> | null = null;
    showEffects$: Observable<boolean> | null = null;
    showExif$: Observable<boolean> | null = null;
    showRatings$: Observable<boolean> | null = null;
    showMinimap$: Observable<boolean> | null = null;
    showHistogram$: Observable<boolean> | null = null;
    showMetadataEditor$: Observable<boolean> | null = null;
    showCategoryTeaserChooser$: Observable<boolean> | null = null;
    enableButtons$: Observable<boolean> | null = null;

    constructor(
        private store: Store
    ) { }

    ngOnInit(): void {
        this.isAdmin$ = this.store.select(AuthStoreSelectors.isAdmin);
        this.enableButtons$ = this.store.select(SettingsStoreSelectors.photoInfoPanelExpandedState);
        this.endSidenavExpanded$ = this.store.select(SettingsStoreSelectors.photoInfoPanelExpandedState);
        this.showComments$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowComments);
        this.showMetadataEditor$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowMetadataEditor);
        this.showCategoryTeaserChooser$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowCategoryTeaserChooser);
        this.showEffects$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowEffects);
        this.showExif$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowExif);
        this.showHistogram$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowHistogram);
        this.showMinimap$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowMinimap);
        this.showRatings$ = this.store.select(SettingsStoreSelectors.photoInfoPanelShowRatings);
    }

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
