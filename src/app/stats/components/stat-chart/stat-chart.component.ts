import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    AfterViewInit,
    OnChanges,
    ChangeDetectionStrategy,
} from '@angular/core';
import { colorSets, TreeMapComponent } from '@swimlane/ngx-charts';
import numbro from 'numbro';

import { StatDetail } from '../../models/stat-detail.model';

@Component({
    selector: 'app-stats-stat-chart',
    templateUrl: './stat-chart.component.html',
    styleUrls: ['./stat-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatChartComponent implements AfterViewInit, OnChanges {
    @Input() chartData: StatDetail[] | null = null;
    @Output() cellSelected = new EventEmitter();
    @ViewChild(TreeMapComponent) treeMap: TreeMapComponent | null = null;

    @Input() set format(value: string) {
        switch (value) {
            case 'count':
                this.formatFunc = formatPlainNumber;
                break;
            case 'size':
                this.formatFunc = formatFilesize;
                break;
            case 'time':
                this.formatFunc = formatTime;
                break;
        }
    }

    formatFunc = formatPlainNumber;
    colorScheme = colorSets.find((s) => s.name === 'cool');

    ngAfterViewInit(): void {
        this.updateMargins();
    }

    ngOnChanges(): void {
        this.updateMargins();
    }

    onSelect(evt: StatDetail): void {
        this.cellSelected.emit(evt);
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

const formatPlainNumber = (val: number): string => {
    return numbro(val).format({ thousandSeparated: true });
};

const formatFilesize = (val: number): string => {
    return numbro(val).format({
        output: 'byte',
        base: 'decimal',
        mantissa: 2,
        spaceSeparated: true,
    });
};

const formatTime = (val: number): string => {
    return numbro(val).format({ output: 'time' });
};
