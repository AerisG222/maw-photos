import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { authGuardToken } from './core/services/auth.guard';
import { authInitResolverToken } from './core/services/auth-init.resolver';
import { RouteHelper } from '@models';

const routes: Routes = [
    {
        path: '',
        resolve: [ authInitResolverToken ],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'categories'
            },
            {
                path: '',
                children: [
                    {
                        path: RouteHelper.login,
                        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
                    }
                ]
            },
            {
                path: '',
                canActivate: [authGuardToken],
                children: [
                    {
                        path: RouteHelper.categories,
                        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
                    },
                    {
                        path: RouteHelper.photoCategories,
                        loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule),
                    },
                    {
                        path: RouteHelper.videoCategories,
                        loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule),
                    },
                    {
                        path: RouteHelper.random,
                        loadChildren: () => import('./random/random.module').then(m => m.RandomModule),
                    },
                    {
                        path: RouteHelper.about,
                        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
                    },
                    {
                        path: RouteHelper.search,
                        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
                    },
                    {
                        path: RouteHelper.settings,
                        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
                    },
                    {
                        path: RouteHelper.stats,
                        loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule),
                    },
                ]
            },
        ]
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
