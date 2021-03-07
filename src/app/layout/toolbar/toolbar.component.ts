import { Component, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { toolbarShow } from '@shared/animations';

@Component({
    selector: 'app-layout-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [useAnimation(toolbarShow)]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {}
