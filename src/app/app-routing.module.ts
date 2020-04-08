import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
        path: 'help',
        loadChildren: () => import('./help/help.module').then(m => m.HelpModule),
        resolve: [ authInitResolverToken ]
    },
    {
        path: 'random',
        loadChildren: () => import('./random/random.module').then(m => m.RandomModule),
        canActivate: [authGuardToken],
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
