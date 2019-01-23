import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from './settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        AppMaterialModule,
        CommonModule,
        SettingsRoutingModule
    ]
})
export class SettingsModule { }
