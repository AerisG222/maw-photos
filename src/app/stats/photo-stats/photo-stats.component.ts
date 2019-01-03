import { Component, OnInit } from '@angular/core';
import { PhotoApiService } from 'src/app/services/photo-api.service';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';

@Component({
    selector: 'app-photo-stats',
    templateUrl: './photo-stats.component.html',
    styleUrls: ['./photo-stats.component.scss']
})
export class PhotoStatsComponent implements OnInit {
    constructor(private _api: PhotoApiService) {

    }

    ngOnInit() {
        this._api.getPhotoStats().subscribe();
    }
}
