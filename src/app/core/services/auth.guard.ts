import { Injectable, Inject } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService, authServiceToken } from './auth.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private settingsSvc: SettingsService,
        @Inject(authServiceToken) private authService: AuthService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.settingsSvc.setAuthRedirectUrl(state.url);

        return new Promise((resolve) => {
            this.authService.startSilentRenew()
                .then(() => {
                    if (this.authService.isLoggedIn()) {
                        resolve(true);
                    } else {
                        this.authService.startAuthentication();
                        resolve(false);
                    }
                })
                .catch(() => {
                    this.authService.startAuthentication();
                    resolve(false);
                });
        });
    }
}
