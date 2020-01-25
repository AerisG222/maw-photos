import { NgModule } from '@angular/core';

import { photoApiServiceToken } from '../photo-api.service';
import { ExternalPhotoApiService } from './external-photo-api.service';
import { ExternalVideoApiService } from './external-video-api.service';
import { videoApiServiceToken } from '../video-api.service';
import { ExternalAuthGuard } from './external-auth.guard';
import { authGuardToken } from '../auth.guard';
import { searchApiServiceToken } from '../search-api.service';
import { ExternalSearchApiService } from './external-search-api.service';

@NgModule({
    providers: [
        { provide: authGuardToken, useClass: ExternalAuthGuard },
        { provide: photoApiServiceToken, useClass: ExternalPhotoApiService },
        { provide: videoApiServiceToken, useClass: ExternalVideoApiService },
        { provide: searchApiServiceToken, useClass: ExternalSearchApiService }
    ]
})
export class ExternalServicesModule { }
