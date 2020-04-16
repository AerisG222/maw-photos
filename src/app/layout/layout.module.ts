import { NgModule } from '@angular/core';

import { EmptyComponent } from './empty/empty.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarSidebarComponent } from './toolbar-sidebar/toolbar-sidebar.component';

@NgModule({
    declarations: [
        EmptyComponent,
        ToolbarComponent,
        ToolbarSidebarComponent
    ],
    imports: [
    ],
    exports: [
        EmptyComponent,
        ToolbarComponent,
        ToolbarSidebarComponent
    ]
})
export class LayoutModule { }
