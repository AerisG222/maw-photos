import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
//    { path: 'admin',      loadChildren: './admin/admin.module#AdminModule',                canActivate: [AuthGuard] },
    { path: 'auth',       loadChildren: './auth/auth.module#AuthModule' },
    { path: 'categories', loadChildren: './categories/categories.module#CategoriesModule', canActivate: [AuthGuard] },
    { path: 'help',       loadChildren: './help/help.module#HelpModule' },
    { path: 'random',     loadChildren: './random/random.module#RandomModule',             canActivate: [AuthGuard] },
//    { path: 'search',     loadChildren: './search/search.module#SearchModule',             canActivate: [AuthGuardService] },
    { path: 'settings',   loadChildren: './settings/settings.module#SettingsModule' },
    { path: 'stats',      loadChildren: './stats/stats.module#StatsModule',                canActivate: [AuthGuard] },
    { path: '**',         redirectTo: 'categories' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
