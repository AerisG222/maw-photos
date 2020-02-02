import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authGuardToken } from './core/services/auth.guard';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [authGuardToken]
    },
    {
        path: 'help',
        loadChildren: () => import('./help/help.module').then(m => m.HelpModule)
    },
    {
        path: 'random',
        loadChildren: () => import('./random/random.module').then(m => m.RandomModule),
        canActivate: [authGuardToken]
    },
    {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
        canActivate: [authGuardToken]
    },
    {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path: 'stats',
        loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule),
        canActivate: [authGuardToken]
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
