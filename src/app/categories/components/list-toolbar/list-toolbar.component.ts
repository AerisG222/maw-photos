import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

import { ThumbnailSize, Margin } from '@models';

@Component({
  selector: 'app-list-toolbar',
  templateUrl: './list-toolbar.component.html',
  styleUrls: ['./list-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListToolbarComponent {
    @Input() thumbnailSize = ThumbnailSize.default;
    @Input() margin = Margin.dense;
    @Output() toggleThumbnailSize = new EventEmitter<ThumbnailSize>();
    @Output() toggleMargin = new EventEmitter<Margin>();

    onToggleThumbnailSize(): void {
        const newSize = ThumbnailSize.nextSize(this.thumbnailSize.name);

        this.toggleThumbnailSize.next(newSize);
    }

    onToggleMargins(): void {
        const newMargin = Margin.nextSize(this.margin.name);

        this.toggleMargin.next(newMargin);
    }
}
