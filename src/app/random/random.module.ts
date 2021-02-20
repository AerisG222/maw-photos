import { NgModule } from '@angular/core';

import { RandomRoutingModule } from './random-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PhotosSharedModule } from '../photos-shared/photos-shared.module';
import {
    Navigable,
    Commentable,
    Ratable,
    MetadataEditable,
    MiniMapable,
    CategoryTeaserSelectable,
    PhotoLinkable,
    PhotoViewModeSelectable
} from '@models';
import { RandomStoreFacadeService } from './services/random-store-facade.service';
import { RandomDetailSettingsFacade } from '@core/facades/settings/random-detail-settings-facade';
import { PhotoDetailSettingsFacade } from '@core/facades/settings/photo-detail-settings-facade';
import { PhotoGridSettingsFacade } from '@core/facades/settings/random-grid-settings-facade';
import { RandomGridSettingsFacade } from '@core/facades/settings/photo-grid-settings-facade';
import { PhotoPageSettingsFacade } from '@core/facades/settings/photo-page-settings-facade';
import { RandomPageSettingsFacade } from '@core/facades/settings/random-page-settings-facade';
import { PhotoInfoPanelSettingsFacade } from '@core/facades/settings/photo-info-panel-settings-facade';
import { RandomInfoPanelSettingsFacade } from '@core/facades/settings/random-info-panel-settings-facade';

@NgModule({
    declarations: [],
    imports: [SharedModule, PhotosSharedModule, RandomRoutingModule],
    providers: [
        RandomStoreFacadeService,
        { provide: Navigable, useExisting: RandomStoreFacadeService },
        { provide: Commentable, useExisting: RandomStoreFacadeService },
        { provide: Ratable, useExisting: RandomStoreFacadeService },
        { provide: MetadataEditable, useExisting: RandomStoreFacadeService },
        { provide: MiniMapable, useExisting: RandomStoreFacadeService },
        {
            provide: CategoryTeaserSelectable,
            useExisting: RandomStoreFacadeService,
        },
        { provide: PhotoLinkable, useExisting: RandomStoreFacadeService },
        {
            provide: PhotoViewModeSelectable,
            useExisting: RandomStoreFacadeService,
        },

        // override setting facades used in shared components
        {
            provide: PhotoDetailSettingsFacade,
            useExisting: RandomDetailSettingsFacade,
        },
        {
            provide: PhotoGridSettingsFacade,
            useExisting: RandomGridSettingsFacade,
        },
        {
            provide: PhotoInfoPanelSettingsFacade,
            useExisting: RandomInfoPanelSettingsFacade,
        },
        {
            provide: PhotoPageSettingsFacade,
            useExisting: RandomPageSettingsFacade,
        },
    ],
})
export class RandomModule {}
