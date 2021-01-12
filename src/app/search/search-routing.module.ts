import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteHelperService } from '@core/services';

import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
    { path: '', component: SearchComponent, children: [
        { path: 'grid', component: SearchComponent, data: { view: 'grid' }},
        { path: 'list', component: SearchComponent, data: { view: 'list' }},
        { path: '', redirectTo: RouteHelperService.searchViewDefault, pathMatch: 'full'},
    ]},
    { path: '**',  redirectTo: RouteHelperService.searchViewDefault }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
