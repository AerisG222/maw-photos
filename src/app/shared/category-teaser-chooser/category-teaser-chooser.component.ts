import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { CategoryTeaserChooserMode } from './category-teaser-chooser-mode.model';

@Component({
    selector: 'app-category-teaser-chooser',
    templateUrl: './category-teaser-chooser.component.html',
    styleUrls: ['./category-teaser-chooser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTeaserChooserComponent implements OnInit {
    @Input() mode: CategoryTeaserChooserMode;

    constructor() { }

    ngOnInit(): void {
    }

    onSetTeaser(): void {

    }
}
