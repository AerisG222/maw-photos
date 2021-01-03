/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoCategoriesResolverService } from 'src/app/core/services/photo-categories-resolver.service';
import { DefaultViewComponent } from '../photos-shared/components/default-view/default-view.component';
import { FullscreenViewComponent } from '../photos-shared/components/fullscreen-view/fullscreen-view.component';
import { BulkEditComponent } from './components/bulk-edit/bulk-edit.component';
import { GridPhotoComponent } from './components/grid-photo/grid-photo.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { MapViewComponent } from './components/map-view/map-view.component';

const routes: Routes = [
    { path: ':categoryId/bulk-edit',           component: BulkEditComponent,       resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }, data: { requirePhotoId: false } },
    { path: ':categoryId/detail/:photoId',     component: DefaultViewComponent,    resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }, data: { requirePhotoId: true } },
    { path: ':categoryId/fullscreen/:photoId', component: FullscreenViewComponent, resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }, data: { requirePhotoId: true } },
    { path: ':categoryId/grid',                component: GridViewComponent,       resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService }, data: { requirePhotoId: false }, children: [
        { path: ':photoId', component: GridPhotoComponent, data: { requirePhotoId: true } }
    ]},
//    { path: ':categoryId/grid/:photoId',       component: GridViewComponent,       resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
    { path: ':categoryId/map',                 component: MapViewComponent,        resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
//    { path: ':categoryId/map/:photoId',        component: MapViewComponent,        resolve: { photoCategoriesResolverService: PhotoCategoriesResolverService } },
    { path: ':categoryId', redirectTo: ':categoryId/grid', pathMatch: 'full' },
    { path: '**', redirectTo: '/categories' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PhotosRoutingModule { }
