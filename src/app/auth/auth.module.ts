import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SpaSigninComponent } from './spa-signin/spa-signin.component';

@NgModule({
    declarations: [
        SpaSigninComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
