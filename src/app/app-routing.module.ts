import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SpaSigninComponent } from './spa-signin/spa-signin.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'spa-signin', component: SpaSigninComponent },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuardService] },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
