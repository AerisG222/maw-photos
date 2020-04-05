import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { authConfig } from '../../auth-config';
import { updateUserInfoRequest } from '../../root-store/auth-store/actions';
import { AuthService } from '../auth.service';

@Injectable()
export class ExternalAuthService implements AuthService {
    constructor(
        private store$: Store,
        private router: Router,
        private oauthService: OAuthService
    ) {
        this.oauthService.configure(authConfig);

        this.oauthService.events
            .pipe(
                filter(e => e.type === 'token_received'),
                tap(p => this.finishLogin())
            )
            .subscribe();

        this.oauthService.setupAutomaticSilentRefresh();
    }

    public handleLoginCallback() {
        if (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()) {
            // if we already have valid tokens, let's use them
            this.oauthService.loadDiscoveryDocument()
                .then(_ => this.finishLogin());
        } else {
            // check to see if we are receiving the auth response, and if so, receive the tokens
            this.oauthService.loadDiscoveryDocumentAndTryLogin();
        }
    }

    public redirectAndLogin() {
        this.oauthService.initCodeFlow();
    }

    public async loginViaPopup() {
        await this.oauthService.loadDiscoveryDocument();

        this.oauthService.initLoginFlowInPopup({ height: 600, width: 600 });
    }

    private finishLogin() {
        if (this.router.routerState.snapshot.url.startsWith('/login')) {
            this.oauthService.loadUserProfile()
                .then(profile => {
                    this.storeProfile(profile);
                    this.router.navigate(['/']);
                });
        }
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
