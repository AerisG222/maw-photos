import { Injectable } from '@angular/core';

import { IAuthService } from './iauth.service';

@Injectable()
export class MockAuthService implements IAuthService {
    isLoggedIn(): boolean {
        return true;
    }

    getClaims(): any {
        throw new Error('not implemented');
    }

    getAuthorizationHeaderValue(): string {
        throw new Error('not implemented');
    }

    startAuthentication(): Promise<void> {
        throw new Error('not implemented');
    }

    completeAuthentication(): Promise<void> {
        throw new Error('not implemented');
    }
}
