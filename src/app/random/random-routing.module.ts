/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoCategoriesResolverService } from '../core/services/photo-categories-resolver.service';
import { DefaultViewComponent } from '../photos-shared/components/default-view/default-view.component';
import { FullscreenViewComponent } from '../photos-shared/components/fullscreen-view/fullscreen-view.component';
import { GridViewComponent } from '../photos/components/grid-view/grid-view.component';

const routes: Routes = [
    { path: 'detail/:photoId',     component: DefaultViewComponent,    resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
    { path: 'fullscreen/:photoId', component: FullscreenViewComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
    { path: 'grid',                component: GridViewComponent,       resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
    { path: 'grid/:photoId',       component: GridViewComponent,       resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
    { path: '', redirectTo: 'grid', pathMatch: 'full' },
    { path: '**', redirectTo: '/random' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RandomRoutingModule { }
