import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

import { AuthGuard } from '../auth.guard';

@Injectable()
export class ExternalAuthGuard implements AuthGuard {
    constructor(
        private router: Router,
        private oauthService: OAuthService
    ) {

    }

    public canActivate() {
        if (
            this.oauthService.hasValidAccessToken() &&
            this.oauthService.hasValidIdToken()
        ) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
