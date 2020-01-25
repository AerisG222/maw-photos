import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { toolbarShow } from 'src/app/shared/animations';

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

    constructor(
        private store$: Store<{}>,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            query: ['', Validators.required]
        });
    }

    onSearch() {
        const searchTerm = this.form.get('query').value;

        console.log(`here: ${ searchTerm }`);
    }
}
