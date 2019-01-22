import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService, AUTH_SERVICE } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(@Inject(AUTH_SERVICE) private _authService: AuthService) {

    }

    canActivate(): boolean {
        if (this._authService.isLoggedIn()) {
            return true;
        }

        this._authService.startAuthentication();

        return false;
    }
}
