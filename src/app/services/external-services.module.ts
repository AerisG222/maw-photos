import { NgModule } from '@angular/core';

import { ASSET_PATH_SERVICE } from './asset-path.service';
import { ExternalAssetPathService } from './external-asset-path.service';
import { AUTH_SERVICE } from './auth.service';
import { ExternalAuthService } from './external-auth.service';
import { PHOTO_API_SERVICE } from './photo-api.service';
import { ExternalPhotoApiService } from './external-photo-api.service';

@NgModule({
    providers: [
        { provide: ASSET_PATH_SERVICE, useClass: ExternalAssetPathService },
        { provide: AUTH_SERVICE, useClass: ExternalAuthService },
        { provide: PHOTO_API_SERVICE, useClass: ExternalPhotoApiService }
    ]
})
export class ExternalServicesModule { }
