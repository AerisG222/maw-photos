import { Component, ChangeDetectionStrategy } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Store } from '@ngrx/store';

import { sidebarShow, sidebarHide, sidebarCardShow, sidebarCardHide } from '@shared/animations';
import { AuthStoreSelectors } from '@core/root-store';
import { PhotoInfoPanelSettingsFacade } from '@core/facades/settings/photo-info-panel-settings-facade';

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
    settings$ = this.infoPanelSettings.settings$;

    constructor(
        private store: Store,
        private infoPanelSettings: PhotoInfoPanelSettingsFacade
    ) { }

    toggleSidebar(): void {
        this.infoPanelSettings.toggleSidebar();
    }

    toggleRatings(): void {
        this.infoPanelSettings.toggleRating();
    }

    toggleCategoryTeaserChooser(): void {
        this.infoPanelSettings.toggleCategoryTeaserChooser();
    }

    toggleComments(): void {
        this.infoPanelSettings.toggleComments();
    }

    toggleMetadataEditor(): void {
        this.infoPanelSettings.toggleMetadataEditor();
    }

    toggleExif(): void {
        this.infoPanelSettings.toggleExif();
    }

    toggleHistogram(): void {
        this.infoPanelSettings.toggleHistogram();
    }

    toggleEffects(): void {
        this.infoPanelSettings.toggleEffects();
    }

    toggleMinimap(): void {
        this.infoPanelSettings.toggleMinimap();
    }
}
