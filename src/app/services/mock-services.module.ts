import { NgModule } from '@angular/core';

import { AUTH_SERVICE } from './iauth.service';
import { MockAuthService } from './mock-auth.service';
import { PHOTO_API_SERVICE } from './iphoto-api.service';
import { MockPhotoApiService } from './mock-photo-api.service';

@NgModule({
    providers: [
        { provide: AUTH_SERVICE, useClass: MockAuthService },
        { provide: PHOTO_API_SERVICE, useClass: MockPhotoApiService }
    ]
})
export class MockServicesModule { }
