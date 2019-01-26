import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { colorSets } from '@swimlane/ngx-charts/release/utils';
import { TreeMapComponent } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-stat-chart',
    templateUrl: './stat-chart.component.html',
    styleUrls: ['./stat-chart.component.scss']
})
export class StatChartComponent implements AfterViewInit {
    @Input() chartData;
    @Output() select = new EventEmitter();
    @ViewChild(TreeMapComponent) treeMap: TreeMapComponent;

    colorScheme = colorSets.find(s => s.name === 'cool');

    ngAfterViewInit() {
        setTimeout(() => {
            this.treeMap.margin = [10, 0, 0, 0];
            this.treeMap.update();
        }, 0);
    }

    onSelect(evt) {
        this.select.emit(evt);
    }
}
