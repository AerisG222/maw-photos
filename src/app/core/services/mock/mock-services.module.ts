import { NgModule } from '@angular/core';

import { photoApiServiceToken } from '../photo-api.service';
import { MockPhotoApiService } from './mock-photo-api.service';
import { videoApiServiceToken } from '../video-api.service';
import { MockVideoApiService } from './mock-video-api.service';
import { authGuardToken } from '../auth.guard';
import { MockAuthGuard } from './mock-auth.guard';
import { searchApiServiceToken } from '../search-api.service';
import { MockSearchApiService } from './mock-search-api.service';

@NgModule({
    providers: [
        { provide: authGuardToken, useClass: MockAuthGuard },
        { provide: photoApiServiceToken, useClass: MockPhotoApiService },
        { provide: videoApiServiceToken, useClass: MockVideoApiService },
        { provide: searchApiServiceToken, useClass: MockSearchApiService }
    ]
})
export class MockServicesModule { }
