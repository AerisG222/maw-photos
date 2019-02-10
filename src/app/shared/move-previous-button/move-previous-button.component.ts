import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { PhotoStoreSelectors, RootStoreState } from 'src/app/core/root-store';

@Component({
    selector: 'app-move-previous-button',
    templateUrl: './move-previous-button.component.html',
    styleUrls: ['./move-previous-button.component.scss']
})
export class MovePreviousButtonComponent implements OnInit {
    @Output() movePrevious = new EventEmitter<void>();

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
}
