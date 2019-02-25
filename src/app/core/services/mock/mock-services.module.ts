import { NgModule } from '@angular/core';

import { authServiceToken } from '../auth.service';
import { photoApiServiceToken } from '../photo-api.service';
import { MockAuthService } from './mock-auth.service';
import { MockPhotoApiService } from './mock-photo-api.service';
import { videoApiServiceToken } from '../video-api.service';
import { MockVideoApiService } from './mock-video-api.service';

@NgModule({
    providers: [
        { provide: authServiceToken, useClass: MockAuthService },
        { provide: photoApiServiceToken, useClass: MockPhotoApiService },
        { provide: videoApiServiceToken, useClass: MockVideoApiService }
    ]
})
export class MockServicesModule { }
