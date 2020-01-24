import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
    selector: 'app-search-link',
    templateUrl: './search-link.component.html',
    styleUrls: ['./search-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLinkComponent {
    @Input() tooltipPosition: TooltipPosition = 'after';
}
