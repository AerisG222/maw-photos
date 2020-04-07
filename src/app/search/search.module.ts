import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchStoreModule } from './store';

import { SearchComponent } from './components/search/search.component';
import { SearchToolbarComponent } from './components/search-toolbar/search-toolbar.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchMoreComponent } from './components/search-more/search-more.component';
import { ResultCountComponent } from './components/result-count/result-count.component';

@NgModule({
    declarations: [
        SearchComponent,
        SearchToolbarComponent,
        SearchFormComponent,
        SearchMoreComponent,
        ResultCountComponent
    ],
    imports: [
        SearchRoutingModule,
        SearchStoreModule,
        SharedModule
    ]
})
export class SearchModule { }
