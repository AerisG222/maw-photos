import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-sidebar-category-teaser-chooser-card',
    templateUrl: './category-teaser-chooser-card.component.html',
    styleUrls: ['./category-teaser-chooser-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTeaserChooserCardComponent {
    @Input() currentTeaserUrl: string | null = null;
    @Output() setTeaser = new EventEmitter<void>();

    onSetTeaser(): void {
        this.setTeaser.next();
    }
}
