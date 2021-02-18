import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-sidebar-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupComponent {
    @HostBinding('class.mat-elevation-z4') get(): boolean {
        return true;
    }
}
