import { Injectable, Inject } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService, authServiceToken } from './auth.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private _settingsSvc: SettingsService,
        @Inject(authServiceToken) private _authService: AuthService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        if (this._authService.isLoggedIn()) {
            return true;
        }

        this._settingsSvc.setAuthRedirectUrl(state.url);

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
