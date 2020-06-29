import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { colorSets, TreeMapComponent } from '@swimlane/ngx-charts';
import * as numeral from 'numeral';

import { StatDetail } from '../../models/stat-detail.model';

@Component({
    selector: 'app-stats-stat-chart',
    templateUrl: './stat-chart.component.html',
    styleUrls: ['./stat-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatChartComponent implements AfterViewInit, OnChanges {
    @Input() chartData?: StatDetail[];
    @Output() cellSelected = new EventEmitter();
    @ViewChild(TreeMapComponent) treeMap?: TreeMapComponent;

    @Input() set format(value: string) {
        switch (value) {
            case 'count':
                this.formatFunc = this.formatPlainNumber;
                break;
            case 'size':
                this.formatFunc = this.formatFilesize;
                break;
            case 'time':
                this.formatFunc = this.formatTime;
                break;
        }
    }

    formatFunc = this.formatPlainNumber;
    colorScheme = colorSets.find(s => s.name === 'cool');

    ngAfterViewInit(): void {
        this.updateMargins();
    }

    ngOnChanges(): void {
        this.updateMargins();
    }

    onSelect(evt: StatDetail): void {
        this.cellSelected.emit(evt);
    }

    formatPlainNumber(val: number): string {
        return numeral(val).format('0,0');
    }

    formatFilesize(val: number): string {
        return numeral(val).format('0,0.00 b');
    }

    formatTime(val: number): string {
        return numeral(val).format('00:00:00');
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
