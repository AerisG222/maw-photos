import { NgModule } from '@angular/core';

import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarDividerComponent } from './toolbar-divider/toolbar-divider.component';
import { ToolbarExternalLinkComponent } from './toolbar-external-link/toolbar-external-link.component';
import { ToolbarGroupComponent } from './toolbar-group/toolbar-group.component';
import { ToolbarLinkComponent } from './toolbar-link/toolbar-link.component';
import { BaseModule } from '../../base/base.module';

@NgModule({
    declarations: [
        ToolbarComponent,
        ToolbarGroupComponent,
        ToolbarButtonComponent,
        ToolbarDividerComponent,
        ToolbarExternalLinkComponent,
        ToolbarLinkComponent
    ],
    imports: [
        BaseModule
    ],
    exports: [
        ToolbarComponent,
        ToolbarButtonComponent,
        ToolbarDividerComponent,
        ToolbarExternalLinkComponent,
        ToolbarGroupComponent,
        ToolbarLinkComponent
    ]
})
export class ToolbarModule { }
