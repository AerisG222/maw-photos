import { NgModule } from '@angular/core';

import { RandomRoutingModule } from './random-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PhotosSharedModule } from '../photos-shared/photos-shared.module';
import { Navigable, Commentable, Ratable, MetadataEditable, MiniMapable, CategoryTeaserSelectable, PhotoLinkable } from '@core/facades';
import { RandomStoreFacadeService } from './services/random-store-facade.service';
import { PhotoViewModeSelectable } from '@core/facades/photo-view-mode-selectable';

@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        PhotosSharedModule,
        RandomRoutingModule
    ],
    providers: [
        RandomStoreFacadeService,
        { provide: Navigable,                useExisting: RandomStoreFacadeService },
        { provide: Commentable,              useExisting: RandomStoreFacadeService },
        { provide: Ratable,                  useExisting: RandomStoreFacadeService },
        { provide: MetadataEditable,         useExisting: RandomStoreFacadeService },
        { provide: MiniMapable,              useExisting: RandomStoreFacadeService },
        { provide: CategoryTeaserSelectable, useExisting: RandomStoreFacadeService },
        { provide: PhotoLinkable,            useExisting: RandomStoreFacadeService },
        { provide: PhotoViewModeSelectable,  useExisting: RandomStoreFacadeService },
    ]
})
export class RandomModule { }
