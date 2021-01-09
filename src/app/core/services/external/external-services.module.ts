import { NgModule, ModuleWithProviders } from '@angular/core';

import { photoApiServiceToken } from '@core/services/photo-api.service';
import { ExternalPhotoApiService } from './external-photo-api.service';
import { ExternalVideoApiService } from './external-video-api.service';
import { videoApiServiceToken } from '@core/services/video-api.service';
import { ExternalAuthGuard } from './external-auth.guard';
import { authGuardToken } from '@core/services/auth.guard';
import { searchApiServiceToken } from 'src/app/search/services/search-api.service';
import { ExternalSearchApiService } from 'src/app/search/services/external/external-search-api.service';
import { authServiceToken } from '@core/services/auth.service';
import { ExternalAuthService } from './external-auth.service';
import { authInitResolverToken } from '@core/services/auth-init.resolver';
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
