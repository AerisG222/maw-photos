import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';

import { PhotoApiService, photoApiServiceToken } from '../core/services/photo-api.service';
import { Photo } from '../models/photo.model';
import { Category } from '../models/category.model';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    activePhoto: Photo;

    constructor(
        private _route: ActivatedRoute,
        @Inject(photoApiServiceToken) private _api: PhotoApiService
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
