import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-primary-nav-link',
  templateUrl: './primary-nav-link.component.html',
  styleUrls: ['./primary-nav-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimaryNavLinkComponent {
    @Input() icon: string;
    @Input() routerLink: string[];
    @Input() tooltip: string;
}
