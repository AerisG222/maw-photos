import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { OAuthModule } from 'angular-oauth2-oidc';

import { environment } from 'src/environments/environment';
import { modules } from 'src/environments/modules';
import { throwIfAlreadyLoaded } from './module-import.guard';
import { RootStoreModule } from './root-store';

@NgModule({
    declarations: [],
    imports: [
        HotkeyModule.forRoot({ disableCheatSheet: true }),
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [environment.apiUrl],
                sendAccessToken: true,
            },
        }),
        modules.servicesModule.forRoot(),
        RootStoreModule,
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
