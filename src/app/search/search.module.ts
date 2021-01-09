import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchStoreModule } from './store';

import { ResultCountComponent } from './components/result-count/result-count.component';
import { SearchComponent } from './components/search/search.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchMoreComponent } from './components/search-more/search-more.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
    declarations: [
        ResultCountComponent,
        SearchComponent,
        SearchFormComponent,
        SearchMoreComponent,
        ToolbarComponent
    ],
    imports: [
        SearchRoutingModule,
        SearchStoreModule,
        SharedModule
    ]
})
export class SearchModule { }
