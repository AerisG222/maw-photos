import { NgModule } from '@angular/core';

import { assetPathServiceToken } from '../asset-path.service';
import { authServiceToken } from '../auth.service';
import { photoApiServiceToken } from '../photo-api.service';
import { ExternalAssetPathService } from './external-asset-path.service';
import { ExternalAuthService } from './external-auth.service';
import { ExternalPhotoApiService } from './external-photo-api.service';

@NgModule({
    providers: [
        { provide: assetPathServiceToken, useClass: ExternalAssetPathService },
        { provide: authServiceToken, useClass: ExternalAuthService },
        { provide: photoApiServiceToken, useClass: ExternalPhotoApiService }
    ]
})
export class ExternalServicesModule { }
