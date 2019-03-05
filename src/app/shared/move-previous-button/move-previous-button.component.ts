import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { PhotoStoreSelectors, RootStoreState } from 'src/app/core/root-store';
import { MatButton } from '@angular/material';
import { CanRipple } from 'src/app/core/models/can-ripple.model';

@Component({
    selector: 'app-move-previous-button',
    templateUrl: './move-previous-button.component.html',
    styleUrls: ['./move-previous-button.component.scss']
})
export class MovePreviousButtonComponent implements OnInit, CanRipple {
    @Output() movePrevious = new EventEmitter<void>();

    @ViewChild('prevButton') prevButton: MatButton;

    isFirst$: Observable<boolean>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) { }

    ngOnInit() {
        this.isFirst$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoFirst)
            );
    }

    onMovePrevious(): void {
        this.movePrevious.emit();
    }

    triggerRipple(): void {
        if (!this.prevButton.disabled) {
            this.prevButton.ripple.launch({ centered: true });
        }
    }
}
