import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

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
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    exports: [PrimaryNavComponent],
})
export class PrimaryNavModule {}
