import { NgModule } from '@angular/core';

import { assetPathServiceToken } from '../asset-path.service';
import { authServiceToken } from '../auth.service';
import { photoApiServiceToken } from '../photo-api.service';
import { MockAssetPathService } from './mock-asset-path.service';
import { MockAuthService } from './mock-auth.service';
import { MockPhotoApiService } from './mock-photo-api.service';

@NgModule({
    providers: [
        { provide: assetPathServiceToken, useClass: MockAssetPathService },
        { provide: authServiceToken, useClass: MockAuthService },
        { provide: photoApiServiceToken, useClass: MockPhotoApiService }
    ]
})
export class MockServicesModule { }
