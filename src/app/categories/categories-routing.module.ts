import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { YearListComponent } from './year-list/year-list.component';

const routes: Routes = [
    { path: '',    component: YearListComponent },
    { path: 'category/:id', component: CategoryComponent },
    { path: '**',  redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
