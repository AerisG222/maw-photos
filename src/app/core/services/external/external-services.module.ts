import { NgModule } from '@angular/core';

import { authServiceToken } from '../auth.service';
import { photoApiServiceToken } from '../photo-api.service';
import { ExternalAuthService } from './external-auth.service';
import { ExternalPhotoApiService } from './external-photo-api.service';

@NgModule({
    providers: [
        { provide: authServiceToken, useClass: ExternalAuthService },
        { provide: photoApiServiceToken, useClass: ExternalPhotoApiService }
    ]
})
export class ExternalServicesModule { }
