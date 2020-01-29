import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { SharedModule } from '../shared/shared.module';
import { SearchToolbarComponent } from './search-toolbar/search-toolbar.component';
import { SearchFormComponent } from './search-form/search-form.component';


@NgModule({
    declarations: [
        SearchComponent,
        SearchToolbarComponent,
        SearchFormComponent
    ],
    imports: [
        CommonModule,
        SearchRoutingModule,
        SharedModule
    ]
})
export class SearchModule { }
