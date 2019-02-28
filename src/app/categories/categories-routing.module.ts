import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoCategoryComponent } from './photo-category/photo-category.component';
import { YearListComponent } from './year-list/year-list.component';
import { VideoCategoryComponent } from './video-category/video-category.component';

const routes: Routes = [
    { path: '',    component: YearListComponent },
    { path: 'photos/:id', component: PhotoCategoryComponent },
    { path: 'videos/:id', component: VideoCategoryComponent },
    { path: '**',  redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
