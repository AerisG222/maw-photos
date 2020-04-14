import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-category-teaser-chooser',
    templateUrl: './category-teaser-chooser.component.html',
    styleUrls: ['./category-teaser-chooser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTeaserChooserComponent {
    @Input() currentTeaserUrl: string;
    @Output() setTeaser = new EventEmitter<void>();

    onSetTeaser(): void {
        this.setTeaser.next();
    }
}
