import { NgModule } from '@angular/core';

import { authServiceToken } from '../auth.service';
import { photoApiServiceToken } from '../photo-api.service';
import { MockAuthService } from './mock-auth.service';
import { MockPhotoApiService } from './mock-photo-api.service';

@NgModule({
    providers: [
        { provide: authServiceToken, useClass: MockAuthService },
        { provide: photoApiServiceToken, useClass: MockPhotoApiService }
    ]
})
export class MockServicesModule { }
