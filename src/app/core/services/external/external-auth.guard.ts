import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

import { AuthGuard } from '@core/services';
import { SettingsService } from '../settings.service';

@Injectable()
export class ExternalAuthGuard implements AuthGuard {
    constructor(
        private router: Router,
        private oauthService: OAuthService,
        private settingsService: SettingsService
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Promise<boolean> {
        if (this.oauthService.hasValidAccessToken()) {
            return true;
        } else {
            this.settingsService.setAuthRedirectUrl(state.url);
            return this.router.navigate(['/login']);
        }
    }
}
