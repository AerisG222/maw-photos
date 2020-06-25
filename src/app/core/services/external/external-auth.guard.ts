import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

import { AuthGuard } from 'src/app/core/services/auth.guard';

@Injectable()
export class ExternalAuthGuard implements AuthGuard {
    constructor(
        private router: Router,
        private oauthService: OAuthService
    ) {

    }

    public canActivate(): boolean {
        if (this.oauthService.hasValidAccessToken()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
