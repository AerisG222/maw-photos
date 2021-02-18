import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-search-result-count',
    templateUrl: './result-count.component.html',
    styleUrls: ['./result-count.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultCountComponent {
    @Input() resultsShownCount: number | null = null;
    @Input() totalCount: number | null = null;
}
