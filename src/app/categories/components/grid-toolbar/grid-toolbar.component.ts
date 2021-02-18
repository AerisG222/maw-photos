import {
    Component,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';

import { Margin, nextMargin, nextThumbnailSize, ThumbnailSize } from '@models';

@Component({
    selector: 'app-grid-toolbar',
    templateUrl: './grid-toolbar.component.html',
    styleUrls: ['./grid-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridToolbarComponent {
    @Input() margin = Margin.dense;
    @Input() showTitles = false;
    @Input() thumbnailSize = ThumbnailSize.default;
    @Output() toggleMargin = new EventEmitter<Margin>();
    @Output() toggleShowTitle = new EventEmitter<boolean>();
    @Output() toggleThumbnailSize = new EventEmitter<ThumbnailSize>();

    onToggleTitle(): void {
        this.toggleShowTitle.next(!this.showTitles);
    }

    onToggleSize(): void {
        const newSize = nextThumbnailSize(this.thumbnailSize);

        this.toggleThumbnailSize.next(newSize);
    }

    onToggleMargins(): void {
        const newMargin = nextMargin(this.margin);

        this.toggleMargin.next(newMargin);
    }
}
