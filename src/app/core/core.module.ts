import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { environment } from '../../environments/environment';
import { EnvironmentConfig } from './models/environment-config';
import { AuthConfig } from './models/auth-config';
import { AuthInterceptor } from './services/auth-interceptor';
import { throwIfAlreadyLoaded } from './module-import.guard';
import { RootStoreModule } from './root-store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
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
                    `${env.wwwUrl}/spa-signin`,
                    `${env.wwwUrl}/spa-silent-signin`
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
