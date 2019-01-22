import { Component, OnInit, Inject } from '@angular/core';

import { PHOTO_API_SERVICE, PhotoApiService } from '../services/photo-api.service';

@Component({
    selector: 'app-random',
    templateUrl: './random.component.html',
    styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {
    constructor(@Inject(PHOTO_API_SERVICE) private _api: PhotoApiService) {

    }

    ngOnInit() {

    }
}
