import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-stats-toolbar',
    templateUrl: './stats-toolbar.component.html',
    styleUrls: ['./stats-toolbar.component.scss']
})
export class StatsToolbarComponent {
    @Output() selectView = new EventEmitter<string>();

    onSelectPhoto() {
        this.selectView.emit('photos');
    }

    onSelectVideo() {
        this.selectView.emit('videos');
    }
}
