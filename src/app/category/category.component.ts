import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';

import { IPhotoApiService, PHOTO_API_SERVICE } from '../services/iphoto-api.service';
import { IPhoto } from '../models/iphoto.model';
import { ICategory } from '../models/icategory.model';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    category$: Observable<ICategory>;
    photos$: Observable<IPhoto[]>;
    activePhoto: IPhoto;

    constructor(
        private _route: ActivatedRoute,
        @Inject(PHOTO_API_SERVICE) private _api: IPhotoApiService
        ) {

    }

    ngOnInit() {
        this.category$ = this._route.params
            .pipe(
                map(p => Number(p.id)),
                flatMap(id => this._api.getCategory(id))
            );

        this.photos$ = this._route.params
            .pipe(
                map(p => Number(p.id)),
                flatMap(id => this._api.getPhotosByCategory(id)),
                tap(photos => this.activePhoto = photos[0])
            );
    }

    back(year: number): void {
        console.log(year);
    }
}
