import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { updateUserInfoRequest } from '@core/root-store/auth-store/actions';
import { AuthService } from '@core/services';

@Injectable()
export class MockAuthService implements AuthService {
    constructor(private store: Store, private router: Router) {}

    async init(): Promise<void> {
        return Promise.resolve();
    }

    handleLoginCallback(): Promise<void> {
        return this.finishLogin();
    }

    redirectAndLogin(): void {
        // do nothing
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    loginViaPopup(): Promise<unknown> {
        return Promise.resolve();
    }

    private async finishLogin(): Promise<void> {
        this.storeProfile();
        await this.router.navigate(['/']);
    }

    private storeProfile(): void {
        const userInfo = {
            username: 'testuser',
            firstName: 'Test',
            lastName: 'User',
            roles: ['admin'],
        };

        this.store.dispatch(updateUserInfoRequest({ userInfo }));
    }
}
