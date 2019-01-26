import { Component, Input, Output, EventEmitter } from '@angular/core';
import { colorSets } from '@swimlane/ngx-charts/release/utils';

@Component({
    selector: 'app-stat-chart',
    templateUrl: './stat-chart.component.html',
    styleUrls: ['./stat-chart.component.css']
})
export class StatChartComponent {
    @Input() chartData;
    @Output() select = new EventEmitter();

    colorScheme = colorSets.find(s => s.name === 'cool');

    onSelect(evt) {
        this.select.emit(evt);
    }
}
