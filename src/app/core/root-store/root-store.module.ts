import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { LayoutStoreModule } from './layout-store/layout-store.module';
import { PhotoCategoryStoreModule } from './photo-category-store/photo-category-store.module';
import { PhotoStoreModule } from './photo-store/photo-store.module';
import { SettingsStoreModule } from './settings-store';
import { VideoCategoryStoreModule } from './video-category-store';
import { VideoStoreModule } from './video-store';
import { AuthStoreModule } from './auth-store';

@NgModule({
    declarations: [],
    imports: [
        AuthStoreModule,
        LayoutStoreModule,
        PhotoCategoryStoreModule,
        PhotoStoreModule,
        SettingsStoreModule,
        VideoCategoryStoreModule,
        VideoStoreModule,
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
            routerState: RouterState.Minimal
        }),
        StoreModule.forRoot({}, {
            runtimeChecks: {
                strictStateSerializability: false,
                strictActionSerializability: false
            }
        }),
        EffectsModule.forRoot([]),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ]
})
export class RootStoreModule { }
