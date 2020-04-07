import { NgModule } from '@angular/core';

import { ToolbarLayoutComponent } from './toolbar-layout/toolbar-layout.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';

@NgModule({
    declarations: [
        EmptyLayoutComponent,
        ToolbarLayoutComponent
    ],
    imports: [
    ],
    exports: [
        EmptyLayoutComponent,
        ToolbarLayoutComponent
    ]
})
export class LayoutModule { }
