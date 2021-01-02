import { NgModule } from '@angular/core';

import { RandomRoutingModule } from './random-routing.module';
import { RandomComponent } from './components/random/random.component';
import { SharedModule } from '../shared/shared.module';
import { PhotosSharedModule } from '../photos-shared/photos-shared.module';
import { Navigable } from '../models/store-facades/navigable';
import { RandomStoreFacadeService } from './services/random-store-facade.service';
import { Commentable } from '../models/store-facades/commentable';
import { Ratable } from '../models/store-facades/ratable';
import { MetadataEditable } from '../models/store-facades/metadata-editable';
import { MiniMapable } from '../models/store-facades/mini-mapable';
import { CategoryTeaserSelectable } from '../models/store-facades/category-teaser-selectable';
import { PhotoLinkable } from '../models/store-facades/photo-linkable';

@NgModule({
    declarations: [
        RandomComponent,
    ],
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
        { provide: PhotoLinkable,            useExisting: RandomStoreFacadeService }
    ]
})
export class RandomModule { }
