import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailViewComponent } from '../photos-shared/components/detail-view/detail-view.component';
import { FullscreenViewComponent } from '../photos-shared/components/fullscreen-view/fullscreen-view.component';
import { BulkEditComponent } from './components/bulk-edit/bulk-edit.component';
import { GridPhotoComponent } from '../photos-shared/components/grid-photo/grid-photo.component';
import { GridViewComponent } from '../photos-shared/components/grid-view/grid-view.component';
import { MapViewComponent } from './components/map-view/map-view.component';

const routes: Routes = [
    {
        path: ':categoryId',
        children: [
            {
                path: 'bulk-edit',
                component: BulkEditComponent,
                data: { view: 'bulk-edit', requirePhotoId: false },
            },
            {
                path: 'detail',
                component: DetailViewComponent,
                data: { view: 'detail', requirePhotoId: true },
                children: [
                    {
                        path: ':photoId',
                        component: DetailViewComponent,
                        data: { view: 'detail', requirePhotoId: true },
                    },
                ],
            },
            {
                path: 'fullscreen',
                component: FullscreenViewComponent,
                data: { view: 'fullscreen', requirePhotoId: true },
                children: [
                    {
                        path: ':photoId',
                        component: FullscreenViewComponent,
                        data: { view: 'fullscreen', requirePhotoId: true },
                    },
                ],
            },
            {
                path: 'grid',
                component: GridViewComponent,
                data: { view: 'grid', requirePhotoId: false },
                children: [
                    {
                        path: ':photoId',
                        component: GridPhotoComponent,
                        data: { view: 'grid', requirePhotoId: true },
                    },
                ],
            },
            {
                path: 'map',
                component: MapViewComponent,
                data: { view: 'map', requirePhotoId: false },
                children: [
                    {
                        path: ':photoId',
                        component: MapViewComponent,
                        data: { view: 'map', requirePhotoId: true },
                    },
                ],
            },
            { path: '', redirectTo: 'grid', pathMatch: 'full' },
        ],
    },
    { path: '**', redirectTo: '/categories' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhotosRoutingModule {}
