import { NgModule } from '@angular/core';

import { ASSET_PATH_SERVICE } from './iasset-path.service';
import { MockAssetPathService } from './mock-asset-path.service';
import { AUTH_SERVICE } from './iauth.service';
import { MockAuthService } from './mock-auth.service';
import { PHOTO_API_SERVICE } from './iphoto-api.service';
import { MockPhotoApiService } from './mock-photo-api.service';

@NgModule({
    providers: [
        { provide: ASSET_PATH_SERVICE, useClass: MockAssetPathService },
        { provide: AUTH_SERVICE, useClass: MockAuthService },
        { provide: PHOTO_API_SERVICE, useClass: MockPhotoApiService }
    ]
})
export class MockServicesModule { }
