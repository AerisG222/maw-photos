import { NgModule } from '@angular/core';

import { BaseModule } from 'src/app/base/base.module';

import { CategoriesLinkComponent } from './categories-link/categories-link.component';
import { HelpLinkComponent } from './help-link/help-link.component';
import { PrimaryNavComponent } from './primary-nav/primary-nav.component';
import { PrimaryNavLinkComponent } from './primary-nav-link/primary-nav-link.component';
import { RandomLinkComponent } from './random-link/random-link.component';
import { SearchLinkComponent } from './search-link/search-link.component';
import { SettingsLinkComponent } from './settings-link/settings-link.component';
import { StatsLinkComponent } from './stats-link/stats-link.component';

@NgModule({
    declarations: [
        CategoriesLinkComponent,
        HelpLinkComponent,
        PrimaryNavComponent,
        PrimaryNavLinkComponent,
        RandomLinkComponent,
        SearchLinkComponent,
        SettingsLinkComponent,
        StatsLinkComponent
    ],
    imports: [
        BaseModule
    ],
    exports: [
        PrimaryNavComponent
    ]
})
export class PrimaryNavModule { }
