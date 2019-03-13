import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HotkeyModule } from 'angular2-hotkeys';

import { environment } from 'src/environments/environment';
import { AuthConfig } from './models/auth-config.model';
import { EnvironmentConfig } from './models/environment-config.model';
import { AuthInterceptor } from './services/auth-interceptor';
import { throwIfAlreadyLoaded } from './module-import.guard';
import { RootStoreModule } from './root-store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HotkeyModule.forRoot({ disableCheatSheet: true }),
        HttpClientModule,
        environment.servicesModule,
        NgxWebstorageModule.forRoot({ prefix: 'maw-photos' }),
        RootStoreModule
    ],
    providers: [
        EnvironmentConfig,
        {
            provide: AuthConfig,
            useFactory: (env: EnvironmentConfig) => {
                return new AuthConfig(
                    env.authUrl,
                    'maw-photos',
                    env.wwwUrl,
                    `${env.wwwUrl}/auth`,
                    `${env.wwwUrl}/auth-silent`
                );
            },
            deps: [EnvironmentConfig]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
