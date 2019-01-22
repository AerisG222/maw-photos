import { Component, OnInit, Inject } from '@angular/core';

import { photoApiServiceToken, PhotoApiService } from '../services/photo-api.service';

@Component({
    selector: 'app-random',
    templateUrl: './random.component.html',
    styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {
    constructor(@Inject(photoApiServiceToken) private _api: PhotoApiService) {

    }

    ngOnInit() {

    }
}
