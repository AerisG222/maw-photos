import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

// animations are applied higher in the chain to avoid leave animiation issues when ngIf is used on parents
// https://github.com/angular/angular/issues/15798

@Component({
    selector: 'app-sidebar-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
    @Input() icon: string;
    @Input() title: string;
}
