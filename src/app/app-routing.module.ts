import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SpaSigninComponent } from './spa-signin/spa-signin.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'category/:id', component: CategoryComponent, canActivate: [AuthGuardService] },
    { path: 'random',   loadChildren: './random/random.module#RandomModule', canActivate: [AuthGuardService] },
    { path: 'search',   loadChildren: './search/search.module#SearchModule', canActivate: [AuthGuardService] },
    { path: 'spa-signin', component: SpaSigninComponent },
    { path: 'admin',    loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuardService] },
    { path: 'stats',    loadChildren: './stats/stats.module#StatsModule', canActivate: [AuthGuardService] },
    { path: 'help',     loadChildren: './help/help.module#HelpModule' },
    { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
