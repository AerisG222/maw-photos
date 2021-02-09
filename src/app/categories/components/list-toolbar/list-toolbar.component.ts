import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

import { ThumbnailSize, CategoryMargin } from '@models';

@Component({
  selector: 'app-list-toolbar',
  templateUrl: './list-toolbar.component.html',
  styleUrls: ['./list-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListToolbarComponent {
    @Input() thumbnailSize = ThumbnailSize.default;
    @Input() margin = CategoryMargin.dense;
    @Output() toggleThumbnailSize = new EventEmitter<ThumbnailSize>();
    @Output() toggleMargin = new EventEmitter<CategoryMargin>();

    onToggleThumbnailSize(): void {
        const newSize = ThumbnailSize.nextSize(this.thumbnailSize.name);

        this.toggleThumbnailSize.next(newSize);
    }

    onToggleMargins(): void {
        const newMargin = CategoryMargin.nextSize(this.margin.name);

        this.toggleMargin.next(newMargin);
    }
}
