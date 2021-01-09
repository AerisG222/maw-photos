import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { authConfig } from '@models';
import { updateUserInfoRequest } from '@core/root-store/auth-store/actions';
import { AuthService } from '@core/services';

@Injectable()
export class ExternalAuthService implements AuthService {
    constructor(
        private store: Store,
        private router: Router,
        private oauthService: OAuthService
    ) {

    }

    async init(): Promise<void> {
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

    handleLoginCallback(): void {
        if (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()) {
            this.finishLogin();
        } else {
            this.oauthService.tryLoginCodeFlow();
        }
    }

    redirectAndLogin(): void {
        this.oauthService.initCodeFlow();
    }

    loginViaPopup(): void {
        this.oauthService.initLoginFlowInPopup({ height: 600, width: 600 });
    }

    private async finishLogin(): Promise<void> {
        if (this.router.routerState.snapshot.url.startsWith('/login')) {
            await this.loadProfile();
            this.router.navigate(['/']);
        }
    }

    private async loadProfile(): Promise<void> {
        const profile = await this.oauthService.loadUserProfile();

        this.storeProfile(profile);
    }

    private storeProfile(profile: UserInfo): void
    {
        if (!!profile) {
            const userInfo = {
                username: profile.name as string,
                firstName: profile.given_name as string,
                lastName: profile.family_name as string,
                roles: profile.role as string[]
            };

            this.store.dispatch(updateUserInfoRequest({ userInfo }));
        }
    }
}
