import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
//    { path: 'admin',      loadChildren: './admin/admin.module#AdminModule',                canActivate: [AuthGuard] },
    { path: 'auth',       loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule), canActivate: [AuthGuard] },
    { path: 'help',       loadChildren: () => import('./help/help.module').then(m => m.HelpModule) },
    { path: 'random',     loadChildren: () => import('./random/random.module').then(m => m.RandomModule),             canActivate: [AuthGuard] },
//    { path: 'search',     loadChildren: './search/search.module#SearchModule',             canActivate: [AuthGuardService] },
    { path: 'settings',   loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
    { path: 'stats',      loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule),                canActivate: [AuthGuard] },
    { path: '**',         redirectTo: 'categories' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
