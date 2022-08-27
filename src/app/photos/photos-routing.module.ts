import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailViewComponent } from '../photos-shared/components/detail-view/detail-view.component';
import { FullscreenViewComponent } from '../photos-shared/components/fullscreen-view/fullscreen-view.component';
import { BulkEditComponent } from './components/bulk-edit/bulk-edit.component';
import { GridPhotoComponent } from '../photos-shared/components/grid-photo/grid-photo.component';
import { GridViewComponent } from '../photos-shared/components/grid-view/grid-view.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { ViewModeGuard } from './services/view-mode.guard';
import { PhotoViewMode } from '@models';

const routes: Routes = [
    {
        path: ':categoryId',
        children: [
            {
                path: 'bulk-edit',
                component: BulkEditComponent,
                data: { view: PhotoViewMode.bulkEdit, requirePhotoId: false },
            },
            {
                path: 'detail',
                component: DetailViewComponent,
                data: { view: PhotoViewMode.detail, requirePhotoId: true },
                children: [
                    {
                        path: ':photoId',
                        component: DetailViewComponent,
                        data: {
                            view: PhotoViewMode.detail,
                            requirePhotoId: true,
                        },
                    },
                ],
            },
            {
                path: 'fullscreen',
                component: FullscreenViewComponent,
                data: { view: PhotoViewMode.fullscreen, requirePhotoId: true },
                children: [
                    {
                        path: ':photoId',
                        component: FullscreenViewComponent,
                        data: {
                            view: PhotoViewMode.fullscreen,
                            requirePhotoId: true,
                        },
                    },
                ],
            },
            {
                path: 'grid',
                component: GridViewComponent,
                data: { view: PhotoViewMode.grid, requirePhotoId: false },
                children: [
                    {
                        path: ':photoId',
                        component: GridPhotoComponent,
                        data: {
                            view: PhotoViewMode.grid,
                            requirePhotoId: true,
                        },
                    },
                ],
            },
            {
                path: 'map',
                component: MapViewComponent,
                data: { view: PhotoViewMode.map, requirePhotoId: false },
                children: [
                    {
                        path: ':photoId',
                        component: MapViewComponent,
                        data: { view: PhotoViewMode.map, requirePhotoId: true },
                    },
                ],
            },
            { path: '', canActivate: [ViewModeGuard], children: [] },
        ],
    },
    { path: '**', redirectTo: '/categories' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhotosRoutingModule {}
