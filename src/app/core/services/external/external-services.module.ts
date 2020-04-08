import { NgModule, ModuleWithProviders } from '@angular/core';

import { photoApiServiceToken } from '../photo-api.service';
import { ExternalPhotoApiService } from './external-photo-api.service';
import { ExternalVideoApiService } from './external-video-api.service';
import { videoApiServiceToken } from '../video-api.service';
import { ExternalAuthGuard } from './external-auth.guard';
import { authGuardToken } from '../auth.guard';
import { searchApiServiceToken } from '../../../search/services/search-api.service';
import { ExternalSearchApiService } from '../../../search/services/external/external-search-api.service';
import { authServiceToken } from '../auth.service';
import { ExternalAuthService } from './external-auth.service';
import { authInitResolverToken } from '../auth-init.resolver';
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
