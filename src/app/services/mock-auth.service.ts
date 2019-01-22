import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class MockAuthService implements AuthService {
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
