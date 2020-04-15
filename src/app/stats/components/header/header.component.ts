import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-stats-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    @Input() title: string;
    @Input() year: number;
    @Output() clickYear = new EventEmitter<void>();

    onBack(): void {
        this.clickYear.emit();
    }
}
