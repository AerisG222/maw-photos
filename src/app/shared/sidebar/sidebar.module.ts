import { NgModule } from '@angular/core';

import { BaseModule } from 'src/app/base/base.module';

import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';
import { SidebarCardComponent } from './sidebar-card/sidebar-card.component';
import { SidebarCardDividerComponent } from './sidebar-card-divider/sidebar-card-divider.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarButtonGroupComponent } from './sidebar-button-group/sidebar-button-group.component';
import { SidebarCardGroupComponent } from './sidebar-card-group/sidebar-card-group.component';
import { SidebarButtonDividerComponent } from './sidebar-button-divider/sidebar-button-divider.component';

@NgModule({
    declarations: [
        SidebarButtonComponent,
        SidebarCardComponent,
        SidebarCardDividerComponent,
        SidebarComponent,
        SidebarButtonGroupComponent,
        SidebarCardGroupComponent,
        SidebarButtonDividerComponent
    ],
    imports: [
        BaseModule
    ],
    exports: [
        SidebarButtonComponent,
        SidebarButtonDividerComponent,
        SidebarButtonGroupComponent,
        SidebarCardComponent,
        SidebarCardGroupComponent,
        SidebarCardDividerComponent,
        SidebarComponent
    ]
})
export class SidebarModule { }
