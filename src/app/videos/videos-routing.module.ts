import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoCategoryComponent } from './components/video-category/video-category.component';
import { VideoCategoriesResolverService } from 'src/app/core/services/video-categories-resolver.service';

const routes: Routes = [
    { path: ':id', component: VideoCategoryComponent, resolve: { VideoCategoriesResolverService } },
    { path: '**', redirectTo: '/categories' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VideosRoutingModule { }
