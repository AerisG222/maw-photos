import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpaSigninComponent } from './spa-signin/spa-signin.component';

const routes: Routes = [
    { path: '', component: SpaSigninComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
