import { NgModule } from '@angular/core';

import { BaseModule } from 'src/app/base/base.module';

import { ButtonComponent } from './button/button.component';
import { DividerComponent } from './divider/divider.component';
import { DownloadButtonComponent } from './download-button/download-button.component';
import { GroupComponent } from './group/group.component';
import { LinkComponent } from './link/link.component';
import { MoveNextButtonComponent } from './move-next-button/move-next-button.component';
import { MovePreviousButtonComponent } from './move-previous-button/move-previous-button.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
    declarations: [
        ButtonComponent,
        GroupComponent,
        DividerComponent,
        DownloadButtonComponent,
        LinkComponent,
        MoveNextButtonComponent,
        MovePreviousButtonComponent,
        ToolbarComponent
    ],
    imports: [
        BaseModule
    ],
    exports: [
        ButtonComponent,
        DividerComponent,
        DownloadButtonComponent,
        GroupComponent,
        LinkComponent,
        MoveNextButtonComponent,
        MovePreviousButtonComponent,
        ToolbarComponent
    ]
})
export class ToolbarModule { }
