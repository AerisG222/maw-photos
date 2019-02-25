import { NgModule } from '@angular/core';

import { authServiceToken } from '../auth.service';
import { photoApiServiceToken } from '../photo-api.service';
import { ExternalAuthService } from './external-auth.service';
import { ExternalPhotoApiService } from './external-photo-api.service';
import { ExternalVideoApiService } from './external-video-api.service';
import { videoApiServiceToken } from '../video-api.service';

@NgModule({
    providers: [
        { provide: authServiceToken, useClass: ExternalAuthService },
        { provide: photoApiServiceToken, useClass: ExternalPhotoApiService },
        { provide: videoApiServiceToken, useClass: ExternalVideoApiService }
    ]
})
export class ExternalServicesModule { }
