import {
    Component,
    Input,
    ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'app-stats-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Input() title: string | null = null;
    @Input() year: number | null = null;
}
