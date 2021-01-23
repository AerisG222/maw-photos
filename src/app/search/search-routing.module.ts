import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteHelper } from '@models';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
    { path: '', component: SearchComponent, children: [
        { path: 'grid', component: SearchComponent, data: { view: 'grid' }},
        { path: 'list', component: SearchComponent, data: { view: 'list' }},
        { path: '', redirectTo: RouteHelper.searchViewDefault, pathMatch: 'full'},
    ]},
    { path: '**',  redirectTo: RouteHelper.searchViewDefault }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
