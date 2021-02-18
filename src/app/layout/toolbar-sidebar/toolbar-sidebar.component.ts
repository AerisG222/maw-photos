import { Component, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { toolbarShow } from '@shared/animations';

@Component({
    selector: 'app-layout-toolbar-sidebar',
    templateUrl: './toolbar-sidebar.component.html',
    styleUrls: ['./toolbar-sidebar.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [useAnimation(toolbarShow)]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarSidebarComponent {}
