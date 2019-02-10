import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PhotoStoreSelectors, RootStoreState } from 'src/app/core/root-store';

@Component({
    selector: 'app-move-next-button',
    templateUrl: './move-next-button.component.html',
    styleUrls: ['./move-next-button.component.scss']
})
export class MoveNextButtonComponent implements OnInit {
    @Output() moveNext = new EventEmitter<void>();

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
}
