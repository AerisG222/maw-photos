/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoCategoriesResolverService } from '@core/services';
import { DetailViewComponent } from '../photos-shared/components/detail-view/detail-view.component';
import { FullscreenViewComponent } from '../photos-shared/components/fullscreen-view/fullscreen-view.component';
import { BulkEditComponent } from './components/bulk-edit/bulk-edit.component';
import { GridPhotoComponent } from '../photos-shared/components/grid-photo/grid-photo.component';
import { GridViewComponent } from '../photos-shared/components/grid-view/grid-view.component';
import { MapViewComponent } from './components/map-view/map-view.component';

const routes: Routes = [
    { path: ':categoryId/bulk-edit', component: BulkEditComponent,   resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }, data: { view: 'bulk-edit', requirePhotoId: false } },
    { path: ':categoryId/detail',    component: DetailViewComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }, data: { view: 'detail', requirePhotoId: true }, children: [
        { path: ':photoId', component: DetailViewComponent, data: { view: 'detail', requirePhotoId: true } }
    ]},
    { path: ':categoryId/fullscreen', component: FullscreenViewComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }, data: { view: 'fullscreen', requirePhotoId: true }, children: [
        { path: ':photoId', component: FullscreenViewComponent, data: { view: 'fullscreen', requirePhotoId: true } }
    ]},
    { path: ':categoryId/grid', component: GridViewComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }, data: { view: 'grid', requirePhotoId: false }, children: [
        { path: ':photoId', component: GridPhotoComponent, data: { view: 'grid', requirePhotoId: true } }
    ]},
    { path: ':categoryId/map', component: MapViewComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }, data: { view: 'map', requirePhotoId: false }, children: [
        { path: ':photoId', component: MapViewComponent, data: { view: 'map', requirePhotoId: true } }
    ]},
    { path: ':categoryId', redirectTo: ':categoryId/grid', pathMatch: 'full' },
    { path: '**', redirectTo: '/categories' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PhotosRoutingModule { }
