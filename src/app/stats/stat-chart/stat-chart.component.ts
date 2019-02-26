import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { colorSets } from '@swimlane/ngx-charts/release/utils';
import { TreeMapComponent } from '@swimlane/ngx-charts';
import * as numeral from 'numeral';

@Component({
    selector: 'app-stat-chart',
    templateUrl: './stat-chart.component.html',
    styleUrls: ['./stat-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatChartComponent implements AfterViewInit, OnChanges {
    @Input() chartData;
    @Output() select = new EventEmitter();
    @ViewChild(TreeMapComponent) treeMap: TreeMapComponent;

    @Input() set format(value: string) {
        switch (value) {
            case 'count':
                this.formatFunc = this.formatPlainNumber;
                break;
            case 'size':
                this.formatFunc = this.formatFilesize;
                break;
        }
    }

    formatFunc = this.formatPlainNumber;
    colorScheme = colorSets.find(s => s.name === 'cool');

    ngAfterViewInit() {
        this.updateMargins();
    }

    ngOnChanges(): void {
        this.updateMargins();
    }

    onSelect(evt) {
        this.select.emit(evt);
    }

    formatPlainNumber(val: number) {
        return numeral(val).format('0,0');
    }

    formatFilesize(val: number) {
        return numeral(val).format('0,0.00 b');
    }

    private updateMargins(): void {
        setTimeout(() => {
            if (this.treeMap) {
                this.treeMap.margin = [10, 0, 0, 0];
                this.treeMap.update();
            }
        }, 0);
    }
}
