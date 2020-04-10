import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { colorSets, NumberCardComponent } from '@swimlane/ngx-charts';

import { StatDetail } from 'src/app/stats/models/stat-detail.model';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements AfterViewInit {
    @Input() detail: StatDetail[];
    @ViewChild(NumberCardComponent) cards: NumberCardComponent;

    colorScheme = colorSets.find(s => s.name === 'cool');

    ngAfterViewInit() {
        this.updateMargins();
    }

    private updateMargins(): void {
        setTimeout(() => {
            if (this.cards) {
                this.cards.margin = [10, 0, 0, 0];
                this.cards.update();
            }
        }, 0);
    }
}
