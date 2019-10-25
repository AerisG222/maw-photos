import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, take } from 'rxjs/operators';

import { toolbarShow } from 'src/app/shared/animations';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent {
    view = 'photos';

    constructor(route: ActivatedRoute) {
        route.data
            .pipe(
                tap(d => this.view = d.view as string),
                take(1)
            )
            .subscribe();
    }
}
