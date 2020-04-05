import { NgModule, ModuleWithProviders } from '@angular/core';

import { photoApiServiceToken } from '../photo-api.service';
import { MockPhotoApiService } from './mock-photo-api.service';
import { videoApiServiceToken } from '../video-api.service';
import { MockVideoApiService } from './mock-video-api.service';
import { authGuardToken } from '../auth.guard';
import { MockAuthGuard } from './mock-auth.guard';
import { searchApiServiceToken } from '../search-api.service';
import { MockSearchApiService } from './mock-search-api.service';
import { authServiceToken } from '../auth.service';
import { MockAuthService } from './mock-auth.service';

@NgModule()
export class MockServicesModule {
    static forRoot(): ModuleWithProviders<MockServicesModule> {
        return {
            providers: [
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
