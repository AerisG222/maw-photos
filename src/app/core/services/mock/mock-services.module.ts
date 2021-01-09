import { NgModule, ModuleWithProviders } from '@angular/core';

import { photoApiServiceToken } from '@core/services/photo-api.service';
import { MockPhotoApiService } from './mock-photo-api.service';
import { videoApiServiceToken } from '@core/services/video-api.service';
import { MockVideoApiService } from './mock-video-api.service';
import { authGuardToken } from '@core/services/auth.guard';
import { MockAuthGuard } from './mock-auth.guard';
import { searchApiServiceToken } from 'src/app/search/services/search-api.service';
import { MockSearchApiService } from 'src/app/search/services/mock/mock-search-api.service';
import { authServiceToken } from '@core/services/auth.service';
import { MockAuthService } from './mock-auth.service';
import { authInitResolverToken } from '@core/services/auth-init.resolver';
import { MockAuthInitResolver } from './mock-auth-init.resolve';

@NgModule()
export class MockServicesModule {
    static forRoot(): ModuleWithProviders<MockServicesModule> {
        return {
            providers: [
                { provide: authInitResolverToken, useClass: MockAuthInitResolver },
                { provide: authGuardToken, useClass: MockAuthGuard },
                { provide: authServiceToken, useClass: MockAuthService },
                { provide: photoApiServiceToken, useClass: MockPhotoApiService },
                { provide: videoApiServiceToken, useClass: MockVideoApiService },
                { provide: searchApiServiceToken, useClass: MockSearchApiService }
            ],
            ngModule: MockServicesModule
        };
    }
}
