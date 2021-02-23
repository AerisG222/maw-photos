import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchStoreModule } from './store';

import { ResultCountComponent } from './components/result-count/result-count.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchMoreComponent } from './components/search-more/search-more.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ListToolbarComponent } from './components/list-toolbar/list-toolbar.component';
import { GridToolbarComponent } from './components/grid-toolbar/grid-toolbar.component';
import { ToolbarGroupSelectViewComponent } from './components/toolbar-group-select-view/toolbar-group-select-view.component';
import { NoResultsFoundComponent } from './components/no-results-found/no-results-found.component';
import { ViewModeGuard } from './services/view-mode.guard';

@NgModule({
    declarations: [
        ResultCountComponent,
        SearchFormComponent,
        SearchMoreComponent,
        GridViewComponent,
        ListViewComponent,
        ListToolbarComponent,
        GridToolbarComponent,
        ToolbarGroupSelectViewComponent,
        NoResultsFoundComponent,
    ],
    imports: [SearchRoutingModule, SearchStoreModule, SharedModule],
    providers: [ ViewModeGuard ]
})
export class SearchModule {}
