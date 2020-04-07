import { Component, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { toolbarShow } from '../../animations';

@Component({
    selector: 'app-toolbar-layout',
    templateUrl: './toolbar-layout.component.html',
    styleUrls: ['./toolbar-layout.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarLayoutComponent {

}
