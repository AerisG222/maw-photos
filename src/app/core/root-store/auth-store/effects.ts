import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap, switchMap } from 'rxjs/operators';

import * as AuthActions from './actions';
import { OidcActions } from 'ng-oidc-client';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class AuthStoreEffects {
    constructor(
        private actions$: Actions
    ) {

    }

    loadUserEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OidcActions.UserFound),
            switchMap(action =>
                of(AuthActions.updateUserPropertiesRequest({ userSettings: action.payload }))
            )
        )
    );
}
