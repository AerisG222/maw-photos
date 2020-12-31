import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { authGuardToken } from './core/services/auth.guard';
import { authInitResolverToken } from './core/services/auth-init.resolver';
import { RouteHelperService } from './core/services/route-helper.service';

const routes: Routes = [
    {
        path: RouteHelperService.login,
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        resolve: [ authInitResolverToken ]
    },
    {
        path: RouteHelperService.categories,
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [authGuardToken],
        resolve: [ authInitResolverToken ]
    },
    {
        path: RouteHelperService.photoCategories,
        loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule),
        canActivate: [authGuardToken],
        resolve: [ authInitResolverToken ]
    },
    {
        path: RouteHelperService.videoCategories,
        loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule),
        canActivate: [authGuardToken],
        resolve: [ authInitResolverToken ]
    },
    {
        path: RouteHelperService.random,
        loadChildren: () => import('./random/random.module').then(m => m.RandomModule),
        canActivate: [authGuardToken],
        resolve: [ authInitResolverToken ]
    },
    {
        path: RouteHelperService.about,
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
        resolve: [ authInitResolverToken ]
    },
    {
        path: RouteHelperService.search,
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
        canActivate: [authGuardToken],
        resolve: [ authInitResolverToken ]
    },
    {
        path: RouteHelperService.settings,
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        resolve: [ authInitResolverToken ]
    },
    {
        path: RouteHelperService.stats,
        loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule),
        canActivate: [authGuardToken],
        resolve: [ authInitResolverToken ]
    },
    {
        path: 'photos/**',
        redirectTo: 'photo-categories'
    },
    {
        path: 'videos/**',
        redirectTo: 'video-categories'
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
