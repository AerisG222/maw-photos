import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { authConfig } from 'src/app/models/auth-config';
import { updateUserInfoRequest } from 'src/app/core/root-store/auth-store/actions';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class ExternalAuthService implements AuthService {
    constructor(
        private store$: Store,
        private router: Router,
        private oauthService: OAuthService
    ) {

    }

    async init() {
        this.oauthService.configure(authConfig);

        await this.oauthService.loadDiscoveryDocument();

        this.oauthService.events
            .pipe(
                filter(e => e.type === 'token_received'),
                tap(p => this.finishLogin())
            )
            .subscribe();

        if (this.oauthService.hasValidAccessToken())
        {
            await this.loadProfile();
        }

        this.oauthService.setupAutomaticSilentRefresh({}, 'access_token');
    }

    handleLoginCallback() {
        if (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()) {
            this.finishLogin();
        } else {
            this.oauthService.tryLoginCodeFlow();
        }
    }

    redirectAndLogin() {
        this.oauthService.initCodeFlow();
    }

    loginViaPopup() {
        this.oauthService.initLoginFlowInPopup({ height: 600, width: 600 });
    }

    private async finishLogin() {
        if (this.router.routerState.snapshot.url.startsWith('/login')) {
            await this.loadProfile();
            this.router.navigate(['/']);
        }
    }

    private async loadProfile() {
        const profile = await this.oauthService.loadUserProfile();

        this.storeProfile(profile);
    }

    private storeProfile(profile)
    {
        if (!!profile) {
            const userInfo = {
                username: profile.name as string,
                firstName: profile.given_name as string,
                lastName: profile.family_name as string,
                roles: profile.role as string[]
            };

            this.store$.dispatch(updateUserInfoRequest({ userInfo }));
        }
    }
}
