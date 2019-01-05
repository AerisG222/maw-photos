import { Component, OnInit, Inject } from '@angular/core';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';

import { PHOTO_API_SERVICE, IPhotoApiService } from 'src/app/services/iphoto-api.service';

@Component({
    selector: 'app-photo-stats',
    templateUrl: './photo-stats.component.html',
    styleUrls: ['./photo-stats.component.scss']
})
export class PhotoStatsComponent implements OnInit {
    constructor(@Inject(PHOTO_API_SERVICE) private _api: IPhotoApiService) {

    }

    ngOnInit() {
        this._api.getPhotoStats().subscribe();
    }
}
