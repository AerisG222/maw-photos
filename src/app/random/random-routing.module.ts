import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoViewMode } from '@models';
import { DetailViewComponent } from '../photos-shared/components/detail-view/detail-view.component';
import { FullscreenViewComponent } from '../photos-shared/components/fullscreen-view/fullscreen-view.component';
import { GridPhotoComponent } from '../photos-shared/components/grid-photo/grid-photo.component';
import { GridViewComponent } from '../photos-shared/components/grid-view/grid-view.component';

const routes: Routes = [
    {
        path: 'detail',
        component: DetailViewComponent,
        data: { view: PhotoViewMode.detail, requirePhotoId: true },
        children: [
            {
                path: ':photoId',
                component: DetailViewComponent,
                data: { view: PhotoViewMode.detail, requirePhotoId: true },
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
                data: { view: PhotoViewMode.fullscreen, requirePhotoId: true },
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
                data: { view: PhotoViewMode.grid, requirePhotoId: true },
            },
        ],
    },
    { path: '', redirectTo: 'grid', pathMatch: 'full' },
    { path: '**', redirectTo: '/random' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RandomRoutingModule {}
