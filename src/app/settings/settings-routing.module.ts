import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { CategorySettingsComponent } from './category-settings/category-settings.component';
import { PhotoSettingsComponent } from './photo-settings/photo-settings.component';
import { RandomSettingsComponent } from './random-settings/random-settings.component';
import { SearchSettingsComponent } from './search-settings/search-settings.component';

import { SettingsComponent } from './settings/settings.component';
import { VideoSettingsComponent } from './video-settings/video-settings.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            { path: 'app', component: AppSettingsComponent },
            { path: 'categories', component: CategorySettingsComponent },
            { path: 'photos', component: PhotoSettingsComponent },
            { path: 'random', component: RandomSettingsComponent },
            { path: 'search', component: SearchSettingsComponent },
            { path: 'videos', component: VideoSettingsComponent },
            { path: '**', redirectTo: 'app' },
        ],
    },
    { path: '**', redirectTo: 'app' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
