import { Component, OnInit, Input, Inject } from '@angular/core';

import { PHOTO_API_SERVICE, IPhotoApiService } from '../services/iphoto-api.service';
import { ICategory } from '../models/icategory.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-year',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {
    @Input() year: number;
    categories$: Observable<ICategory[]>;

    constructor(@Inject(PHOTO_API_SERVICE) private _api: IPhotoApiService) {

    }

    ngOnInit() {
        this.categories$ = this._api.getCategoriesForYear(this.year);
    }
}
