import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { RootStoreState } from 'src/app/core/root-store';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/core/root-store/photo-store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';
import { Rating } from 'src/app/core/models/rating.model';

@Component({
    selector: 'app-photo-info-panel',
    templateUrl: './photo-info-panel.component.html',
    styleUrls: ['./photo-info-panel.component.scss']
})
export class PhotoInfoPanelComponent implements OnInit, OnDestroy {
    endSidenavExpanded = false;
    rating$: Observable<Rating>;

    private destroy$ = new Subject<boolean>();

    constructor(
        private _store$: Store<RootStoreState.State>
    ) { }

    ngOnInit() {
        const currentPhoto$ = this._store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhoto),
            filter(photo => photo !== null),
            tap(photo => this._store$.dispatch(new PhotoStoreActions.LoadRatingRequestAction({ id: photo.id }))),
            takeUntil(this.destroy$)
        );

        this.rating$ = this._store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoRating)
        );

        currentPhoto$.subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }

    toggleEndSidenav(): void {
        this.endSidenavExpanded = !this.endSidenavExpanded;
    }
}
