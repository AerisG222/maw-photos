/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoCategoriesResolverService } from '../core/services/photo-categories-resolver.service';
import { DetailViewComponent } from '../photos-shared/components/detail-view/detail-view.component';
import { FullscreenViewComponent } from '../photos-shared/components/fullscreen-view/fullscreen-view.component';
import { GridPhotoComponent } from '../photos-shared/components/grid-photo/grid-photo.component';
import { GridViewComponent } from '../photos-shared/components/grid-view/grid-view.component';

const routes: Routes = [
    { path: 'detail',    component: DetailViewComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }, data: { view: 'detail', requirePhotoId: true }, children: [
        { path: ':photoId', component: DetailViewComponent, data: { view: 'detail', requirePhotoId: true } }
    ]},
    { path: 'fullscreen', component: FullscreenViewComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }, data: { view: 'fullscreen', requirePhotoId: true }, children: [
        { path: ':photoId', component: FullscreenViewComponent, data: { view: 'fullscreen', requirePhotoId: true } }
    ]},
    { path: 'grid', component: GridViewComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }, data: { view: 'grid', requirePhotoId: false }, children: [
        { path: ':photoId', component: GridPhotoComponent, data: { view: 'grid', requirePhotoId: true } }
    ]},
    { path: '', redirectTo: 'grid', pathMatch: 'full' },
    { path: '**', redirectTo: '/random' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RandomRoutingModule { }
