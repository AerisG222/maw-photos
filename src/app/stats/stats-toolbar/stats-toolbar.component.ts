import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-stats-toolbar',
    templateUrl: './stats-toolbar.component.html',
    styleUrls: ['./stats-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsToolbarComponent {
    @Output() selectView = new EventEmitter<string>();

    onSelectPhoto() {
        this.selectView.emit('photos');
    }

    onSelectVideo() {
        this.selectView.emit('videos');
    }

    onSelectCombined() {
        this.selectView.emit('combined');
    }
}
