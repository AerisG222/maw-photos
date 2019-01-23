import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService, authServiceToken } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(@Inject(authServiceToken) private _authService: AuthService) {

    }

    canActivate(): boolean {
        if (this._authService.isLoggedIn()) {
            return true;
        }

        this._authService.startAuthentication();

        return false;
    }
}
