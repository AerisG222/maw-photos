import { NgModule, ModuleWithProviders } from '@angular/core';

import { photoApiServiceToken, videoApiServiceToken, authGuardToken, authServiceToken, authInitResolverToken } from '@core/services';
import { ExternalPhotoApiService } from './external-photo-api.service';
import { ExternalVideoApiService } from './external-video-api.service';
import { ExternalAuthGuard } from './external-auth.guard';
import { searchApiServiceToken } from 'src/app/search/services/search-api.service';
import { ExternalSearchApiService } from 'src/app/search/services/external/external-search-api.service';
import { ExternalAuthService } from './external-auth.service';
import { ExternalAuthInitResolver } from './external-auth-init.resolve';

@NgModule()
export class ExternalServicesModule {
    static forRoot(): ModuleWithProviders<ExternalServicesModule> {
        return {
            providers: [
                { provide: authInitResolverToken, useClass: ExternalAuthInitResolver },
                { provide: authGuardToken, useClass: ExternalAuthGuard },
                { provide: authServiceToken, useClass: ExternalAuthService },
                { provide: photoApiServiceToken, useClass: ExternalPhotoApiService },
                { provide: videoApiServiceToken, useClass: ExternalVideoApiService },
                { provide: searchApiServiceToken, useClass: ExternalSearchApiService }
            ],
            ngModule: ExternalServicesModule
        };
    }
}
