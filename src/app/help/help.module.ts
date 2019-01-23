import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help/help.component';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
    declarations: [
        HelpComponent
    ],
    imports: [
        AppMaterialModule,
        CommonModule,
        HelpRoutingModule
    ]
})
export class HelpModule { }
