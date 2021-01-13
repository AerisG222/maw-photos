import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoCategoryComponent } from './components/video-category/video-category.component';

const routes: Routes = [
    { path: ':categoryId', component: VideoCategoryComponent },
    { path: ':categoryId/:videoId', component: VideoCategoryComponent },
    { path: '**', redirectTo: '/categories' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VideosRoutingModule { }
