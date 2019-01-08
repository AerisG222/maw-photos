import { NgModule } from '@angular/core';

import { ASSET_PATH_SERVICE } from './iasset-path.service';
import { AssetPathService } from './asset-path.service';
import { AUTH_SERVICE } from './iauth.service';
import { AuthService } from './auth.service';
import { PHOTO_API_SERVICE } from './iphoto-api.service';
import { PhotoApiService } from './photo-api.service';

@NgModule({
    providers: [
        { provide: ASSET_PATH_SERVICE, useClass: AssetPathService },
        { provide: AUTH_SERVICE, useClass: AuthService },
        { provide: PHOTO_API_SERVICE, useClass: PhotoApiService }
    ]
})
export class ExternalServicesModule { }
