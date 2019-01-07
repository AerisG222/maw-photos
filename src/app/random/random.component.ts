import { Component, OnInit, Inject } from '@angular/core';

import { PHOTO_API_SERVICE, IPhotoApiService } from '../services/iphoto-api.service';

@Component({
    selector: 'app-random',
    templateUrl: './random.component.html',
    styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {
    constructor(@Inject(PHOTO_API_SERVICE) private _api: IPhotoApiService) {

    }

    ngOnInit() {

    }
}
