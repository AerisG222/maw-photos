import { Component, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { toolbarShow } from '../../animations';

@Component({
    selector: 'app-toolbar-sidebar-layout',
    templateUrl: './toolbar-sidebar-layout.component.html',
    styleUrls: ['./toolbar-sidebar-layout.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarSidebarLayoutComponent {

}
