import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { updateUserInfoRequest } from '../../root-store/auth-store/actions';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class MockAuthService implements AuthService {
    constructor(
        private store$: Store,
        private router: Router
    ) {

    }

    public handleLoginCallback() {
        this.finishLogin();
    }

    public redirectAndLogin() {
        this.finishLogin();
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
