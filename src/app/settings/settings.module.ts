import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { SettingsComponent } from './settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsToolbarComponent } from './settings-toolbar/settings-toolbar.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { CategorySettingsComponent } from './category-settings/category-settings.component';
import { PhotoSettingsComponent } from './photo-settings/photo-settings.component';
import { RandomSettingsComponent } from './random-settings/random-settings.component';
import { SearchSettingsComponent } from './search-settings/search-settings.component';
import { VideoSettingsComponent } from './video-settings/video-settings.component';
import { SubmitButtonsComponent } from './submit-buttons/submit-buttons.component';
import { HeadingComponent } from './heading/heading.component';
import { BaseSettingsComponent } from './base-settings/base-settings.component';

@NgModule({
    declarations: [
        SettingsComponent,
        SettingsToolbarComponent,
        AppSettingsComponent,
        CategorySettingsComponent,
        PhotoSettingsComponent,
        RandomSettingsComponent,
        SearchSettingsComponent,
        VideoSettingsComponent,
        SubmitButtonsComponent,
        HeadingComponent,
        BaseSettingsComponent
    ],
    imports: [
        SettingsRoutingModule,
        SharedModule
    ]
})
export class SettingsModule { }
