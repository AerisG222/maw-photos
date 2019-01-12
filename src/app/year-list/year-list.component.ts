import { Component, OnInit, Input, Inject } from '@angular/core';

import { PHOTO_API_SERVICE, IPhotoApiService } from '../services/iphoto-api.service';
import { ICategory } from '../models/icategory.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-year',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit {
    @Input() year: number;
    categories$: Observable<ICategory[]>;

    constructor(@Inject(PHOTO_API_SERVICE) private _api: IPhotoApiService) {

    }

    ngOnInit() {
        this.categories$ = this._api.getCategoriesForYear(this.year);
    }
}
