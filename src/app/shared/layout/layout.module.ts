import { NgModule } from '@angular/core';

import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';
import { ToolbarLayoutComponent } from './toolbar-layout/toolbar-layout.component';
import { ToolbarSidebarLayoutComponent } from './toolbar-sidebar-layout/toolbar-sidebar-layout.component';

@NgModule({
    declarations: [
        EmptyLayoutComponent,
        ToolbarLayoutComponent,
        ToolbarSidebarLayoutComponent
    ],
    imports: [
    ],
    exports: [
        EmptyLayoutComponent,
        ToolbarLayoutComponent,
        ToolbarSidebarLayoutComponent
    ]
})
export class LayoutModule { }
