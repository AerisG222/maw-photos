import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { updateUserInfoRequest } from 'src/app/core/root-store/auth-store/actions';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class MockAuthService implements AuthService {
    constructor(
        private store$: Store,
        private router: Router
    ) {

    }

    init() {

    }

    handleLoginCallback() {
        this.finishLogin();
    }

    redirectAndLogin() {
        this.finishLogin();
    }

    loginViaPopup() {

    }

    private finishLogin() {
        this.storeProfile();
        this.router.navigate(['/']);
    }

    private storeProfile()
    {
        const userInfo = {
            username: 'testuser',
            firstName: 'Test',
            lastName: 'User',
            roles: [ 'admin' ]
        };

        this.store$.dispatch(updateUserInfoRequest({ userInfo }));
    }
}
