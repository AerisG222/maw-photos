import { Component, OnInit } from '@angular/core';

import { StatDetail } from '../models/stat-detail.model';

@Component({
    selector: 'app-video-stats',
    templateUrl: './video-stats.component.html',
    styleUrls: ['./video-stats.component.scss']
})
export class VideoStatsComponent implements OnInit {
    details: StatDetail[] = [];

    constructor() { }

    ngOnInit() {
    }

    removeYearFilter(): void {
        console.log('remove year filter');
    }
}
