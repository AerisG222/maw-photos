import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { toolbarShow } from 'src/app/shared/animations';
import { queryRequest } from 'src/app/core/root-store/search-store/actions';
import { SearchResult } from 'src/app/core/models/search/search-result.model';
import { MultimediaCategory } from 'src/app/core/models/search/multimedia-category.model';
import { selectSearchAllResults, selectSearchCurrentResult } from 'src/app/core/root-store/search-store/selectors';
import { CategoryTeaser } from 'src/app/core/models/category-teaser.model';
import { CategoryType } from 'src/app/core/models/category-type.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ]
})
export class SearchComponent implements OnInit {
    form: FormGroup;
    currentResult$: Observable<SearchResult<MultimediaCategory>>;
    categories$: Observable<CategoryTeaser[]>;

    listThumbnailSize = ThumbnailSize.small;

    constructor(
        private store$: Store<{}>,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            query: ['', Validators.required]
        });

        this.currentResult$ = this.store$
            .pipe(
                select(selectSearchCurrentResult)
            );

        this.categories$ = this.store$
            .pipe(
                select(selectSearchAllResults),
                map(cats => cats.map(cat => ({
                    route: `${ cat.multimediaType }s`,
                    id: cat.id,
                    year: cat.year,
                    name: cat.name,
                    teaserImageSqUrl: cat.teaserPhotoSqPath,
                    type: cat.multimediaType === 'photo' ? CategoryType.photo : CategoryType.video
                })))
            );
    }

    onSearch() {
        const searchTerm = this.form.get('query').value;

        this.store$.dispatch(queryRequest({ query: searchTerm }));
    }
}
