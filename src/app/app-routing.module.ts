import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { authGuardToken } from './core/services/auth.guard';
import { authInitResolverToken } from './core/services/auth-init.resolver';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        resolve: [ authInitResolverToken ]
    },
    {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [authGuardToken],
        resolve: [ authInitResolverToken ]
    },
    {
        path: 'photos',
        loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule),
        canActivate: [authGuardToken],
        resolve: [ authInitResolverToken ]
    },
    {
        path: 'videos',
        loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule),
        canActivate: [authGuardToken],
        resolve: [ authInitResolverToken ]
    },
    {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
        resolve: [ authInitResolverToken ]
    },
    {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
        canActivate: [authGuardToken],
        resolve: [ authInitResolverToken ]
    },
    {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        resolve: [ authInitResolverToken ]
    },
    {
        path: 'stats',
        loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule),
        canActivate: [authGuardToken],
        resolve: [ authInitResolverToken ]
    },
    {
        path: '**',
        redirectTo: 'categories'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
