import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgOidcClientModule } from 'ng-oidc-client';
import { Log } from 'oidc-client';

import { config } from 'src/environments/config';
import { environment } from 'src/environments/environment';
import { LayoutStoreModule } from './layout-store/layout-store.module';
import { PhotoCategoryStoreModule } from './photo-category-store/photo-category-store.module';
import { PhotoStoreModule } from './photo-store/photo-store.module';
import { SettingsStoreModule } from './settings-store';
import { VideoCategoryStoreModule } from './video-category-store';
import { VideoStoreModule } from './video-store';
import { SearchStoreModule } from './search-store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        LayoutStoreModule,
        PhotoCategoryStoreModule,
        PhotoStoreModule,
        SearchStoreModule,
        SettingsStoreModule,
        VideoCategoryStoreModule,
        VideoStoreModule,
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
            routerState: RouterState.Minimal
        }),
        StoreModule.forRoot({}, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictStateSerializability: false,
                strictActionSerializability: false
            }
        }),
        EffectsModule.forRoot([]),
        NgOidcClientModule.forRoot({
            oidc_config: {
                client_id: 'maw-photos',
                response_type: 'code',
                scope: 'openid profile maw_api role',
                authority: config.authUrl,
                redirect_uri: `${config.photosUrl}/callback.html`,
                post_logout_redirect_uri: `${config.photosUrl}/signout-callback.html`,
                silent_redirect_uri: `${config.photosUrl}/renew-callback.html`,
                automaticSilentRenew: true,
                filterProtocolClaims: true,
                loadUserInfo: true,
                popupWindowFeatures: 'location=no,toolbar=no,width=600,height=600,left=100,top=100'
            },
            // log: {
            //     logger: console,
            //     level: environment.production ? Log.NONE : Log.INFO
            // }
        }),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ]
})
export class RootStoreModule { }
