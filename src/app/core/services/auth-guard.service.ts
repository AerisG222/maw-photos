import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService, authServiceToken } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(@Inject(authServiceToken) private _authService: AuthService) {

    }

    canActivate(): Promise<boolean> | boolean {
        if (this._authService.isLoggedIn()) {
            return true;
        }

        return new Promise((resolve) => {
            this._authService.startSilentRenew()
                .then(() => {
                    if (this._authService.isLoggedIn()) {
                        resolve(true);
                    } else {
                        this._authService.startAuthentication();
                        resolve(false);
                    }
                })
                .catch(() => {
                    this._authService.startAuthentication();
                    resolve(false);
                });
        });
    }
}
