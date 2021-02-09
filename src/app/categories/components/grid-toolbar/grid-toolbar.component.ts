import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

import { CategoryMargin, ThumbnailSize } from '@models';

@Component({
    selector: 'app-grid-toolbar',
    templateUrl: './grid-toolbar.component.html',
    styleUrls: ['./grid-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridToolbarComponent {
    @Input() margin = CategoryMargin.dense;
    @Input() showTitles = false;
    @Input() thumbnailSize = ThumbnailSize.default;
    @Output() toggleMargin = new EventEmitter<CategoryMargin>();
    @Output() toggleShowTitle = new EventEmitter<boolean>();
    @Output() toggleThumbnailSize = new EventEmitter<ThumbnailSize>();

    onToggleTitle(): void {
        this.toggleShowTitle.next(!this.showTitles);
    }

    onToggleSize(): void {
        const newSize = ThumbnailSize.nextSize(this.thumbnailSize.name);

        this.toggleThumbnailSize.next(newSize);
    }

    onToggleMargins(): void {
        const newMargin = CategoryMargin.nextSize(this.margin.name);

        this.toggleMargin.next(newMargin);
    }
}
