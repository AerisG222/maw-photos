import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { SettingsComponent } from './settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        SettingsRoutingModule,
        SharedModule
    ]
})
export class SettingsModule { }
