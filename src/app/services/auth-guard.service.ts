import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';

import { IAuthService, AUTH_SERVICE } from './iauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(@Inject(AUTH_SERVICE) private _authService: IAuthService) {

    }

    canActivate(): boolean {
        if (this._authService.isLoggedIn()) {
            return true;
        }

        this._authService.startAuthentication();

        return false;
    }
}
