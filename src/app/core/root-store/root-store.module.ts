import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState, MinimalRouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { LayoutStoreModule } from './layout-store';
import { PhotoCategoryStoreModule } from './photo-category-store';
import { SettingsStoreModule } from './settings-store';
import { VideoCategoryStoreModule } from './video-category-store';
import { AuthStoreModule } from './auth-store';
import { RouterStoreModule } from './router-store';

@NgModule({
    declarations: [],
    imports: [
        AuthStoreModule,
        LayoutStoreModule,
        PhotoCategoryStoreModule,
        SettingsStoreModule,
        VideoCategoryStoreModule,
        RouterStoreModule,
        StoreModule.forRoot({}, {
            runtimeChecks: {
                strictActionWithinNgZone: true,
                strictStateSerializability: false,
                strictActionSerializability: false
            }
        }),
        StoreRouterConnectingModule.forRoot({
            routerState: RouterState.Minimal,
            serializer: MinimalRouterStateSerializer
        }),
        EffectsModule.forRoot([]),
        !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
    ]
})
export class RootStoreModule { }
