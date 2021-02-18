import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
    StoreRouterConnectingModule,
    RouterState,
    MinimalRouterStateSerializer,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { LayoutStoreModule } from './layout-store';
import { PhotoCategoryStoreModule } from './photo-category-store';
import { SettingsStoreModule } from './settings-store';
import { VideoCategoryStoreModule } from './video-category-store';
import { AuthStoreModule } from './auth-store';
import { RouterStoreModule } from './router-store';
import { extModules } from './environment/modules';
import { PhotoStoreModule } from './photos-store';

@NgModule({
    declarations: [],
    imports: [
        AuthStoreModule,
        LayoutStoreModule,
        PhotoCategoryStoreModule,
        PhotoStoreModule,
        SettingsStoreModule,
        VideoCategoryStoreModule,
        RouterStoreModule,
        StoreModule.forRoot(
            {},
            {
                runtimeChecks: {
                    strictActionWithinNgZone: true,
                    strictStateSerializability: false,
                    strictActionSerializability: false,
                },
            }
        ),
        StoreRouterConnectingModule.forRoot({
            routerState: RouterState.Minimal,
            serializer: MinimalRouterStateSerializer,
        }),
        EffectsModule.forRoot([]),
        extModules,
    ],
})
export class RootStoreModule {}
