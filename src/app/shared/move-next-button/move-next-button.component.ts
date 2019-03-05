import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PhotoStoreSelectors, RootStoreState } from 'src/app/core/root-store';
import { MatButton } from '@angular/material';
import { CanRipple } from 'src/app/core/models/can-ripple.model';

@Component({
    selector: 'app-move-next-button',
    templateUrl: './move-next-button.component.html',
    styleUrls: ['./move-next-button.component.scss']
})
export class MoveNextButtonComponent implements OnInit, CanRipple {
    @Output() moveNext = new EventEmitter<void>();

    @ViewChild('nextButton') nextButton: MatButton;

    isLast$: Observable<boolean>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) { }

    ngOnInit() {
        this.isLast$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLast)
            );
    }

    onMoveNext(): void {
        this.moveNext.emit();
    }

    triggerRipple(): void {
        if (!this.nextButton.disabled) {
            this.nextButton.ripple.launch({ centered: true });
        }
    }
}
