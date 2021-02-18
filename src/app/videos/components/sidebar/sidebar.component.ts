import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { transition, useAnimation, trigger } from '@angular/animations';

import {
    sidebarShow,
    sidebarHide,
    sidebarCardShow,
    sidebarCardHide,
} from '@shared/animations';
import { AuthStoreSelectors } from '@core/root-store';
import { VideoInfoPanelSettingsFacade } from '@core/facades/settings/video-info-panel-settings-facade';

@Component({
    selector: 'app-videos-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('sidebarFlyInOut', [
            transition(':enter', [useAnimation(sidebarShow)]),
            transition(':leave', [useAnimation(sidebarHide)]),
        ]),
        trigger('sidebarCardShowHide', [
            transition(':enter', [useAnimation(sidebarCardShow)]),
            transition(':leave', [useAnimation(sidebarCardHide)]),
        ]),
    ],
})
export class SidebarComponent {
    isAdmin$ = this.store.select(AuthStoreSelectors.isAdmin);
    settings$ = this.infoPanelFacade.settings$;

    constructor(
        private store: Store,
        private infoPanelFacade: VideoInfoPanelSettingsFacade
    ) {}

    toggleSidebar(): void {
        this.infoPanelFacade.toggleSidebar();
    }

    toggleRatings(): void {
        this.infoPanelFacade.toggleRatings();
    }

    toggleCategoryTeaserChooser(): void {
        this.infoPanelFacade.toggleCategoryTeaserChooser();
    }

    toggleComments(): void {
        this.infoPanelFacade.toggleComments();
    }

    toggleMetadataEditor(): void {
        this.infoPanelFacade.toggleMetadataEditor();
    }

    toggleMinimap(): void {
        this.infoPanelFacade.toggleMinimap();
    }
}
