import { Component, OnInit, Inject } from '@angular/core';

import { PHOTO_API_SERVICE, IPhotoApiService } from '../services/iphoto-api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(@Inject(PHOTO_API_SERVICE) private _api: IPhotoApiService) {

    }

    ngOnInit() {
    }

}
