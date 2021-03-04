import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CategoriesLinkComponent } from './categories-link/categories-link.component';
import { AboutLinkComponent } from './about-link/about-link.component';
import { LinkComponent } from './link/link.component';
import { PrimaryNavComponent } from './primary-nav/primary-nav.component';
import { RandomLinkComponent } from './random-link/random-link.component';
import { SearchLinkComponent } from './search-link/search-link.component';
import { SettingsLinkComponent } from './settings-link/settings-link.component';
import { StatsLinkComponent } from './stats-link/stats-link.component';

@NgModule({
    declarations: [
        CategoriesLinkComponent,
        AboutLinkComponent,
        LinkComponent,
        PrimaryNavComponent,
        RandomLinkComponent,
        SearchLinkComponent,
        SettingsLinkComponent,
        StatsLinkComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatTooltipModule,
    ],
    exports: [PrimaryNavComponent],
})
export class PrimaryNavModule {}
