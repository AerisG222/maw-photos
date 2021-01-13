import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { authGuardToken } from './core/services/auth.guard';
import { authInitResolverToken } from './core/services/auth-init.resolver';
import { RouteHelperService } from './core/services/route-helper.service';
import { PhotoCategoriesResolverService, VideoCategoriesResolverService } from '@core/services';

const routes: Routes = [
    {
        path: '',
        resolve: [ authInitResolverToken ],
        children: [
            // ANONYMOUS ACCESS
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'categories'
            },
            {
                path: '',
                children: [
                    {
                        path: RouteHelperService.login,
                        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
                    }
                ]
            },

            // AUTHORIZED ACCESS
            {
                path: '',
                canActivate: [authGuardToken],
                resolve: {
                    photoCategoriesResolverService: PhotoCategoriesResolverService,
                    videoCategoriesResolverService: VideoCategoriesResolverService
                },
                children: [
                    {
                        path: RouteHelperService.categories,
                        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
                    },
                    {
                        path: RouteHelperService.photoCategories,
                        loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule),
                    },
                    {
                        path: RouteHelperService.videoCategories,
                        loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule),
                    },
                    {
                        path: RouteHelperService.random,
                        loadChildren: () => import('./random/random.module').then(m => m.RandomModule),
                    },
                    {
                        path: RouteHelperService.about,
                        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
                    },
                    {
                        path: RouteHelperService.search,
                        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
                    },
                    {
                        path: RouteHelperService.settings,
                        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
                    },
                    {
                        path: RouteHelperService.stats,
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
