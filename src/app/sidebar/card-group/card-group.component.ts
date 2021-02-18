import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-sidebar-card-group',
    templateUrl: './card-group.component.html',
    styleUrls: ['./card-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGroupComponent {
    @HostBinding('class.mat-elevation-z4') get(): boolean {
        return true;
    }
}
