import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-stats-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
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
