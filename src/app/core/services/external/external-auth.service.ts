import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { authConfig, UserInfo } from '@models';
import { updateUserInfoRequest } from '@core/root-store/auth-store/actions';
import { AuthService, SettingsService } from '@core/services';

@Injectable()
export class ExternalAuthService implements AuthService {
    constructor(
        private store: Store,
        private router: Router,
        private oauthService: OAuthService,
        private settingsService: SettingsService,
    ) {}

    async init(): Promise<void> {
        this.oauthService.configure(authConfig);

        await this.oauthService.loadDiscoveryDocument();

        this.oauthService.events
            .pipe(
                filter((e) => e.type === 'token_received'),
                switchMap(() => this.finishLogin())
            )
            .subscribe();

        if (this.oauthService.hasValidAccessToken()) {
            await this.loadProfile();
        }

        this.oauthService.setupAutomaticSilentRefresh({}, 'access_token');
    }

    handleLoginCallback(): Promise<void> {
        if (
            this.oauthService.hasValidAccessToken() &&
            this.oauthService.hasValidIdToken()
        ) {
            return this.finishLogin();
        } else {
            return this.oauthService.tryLoginCodeFlow();
        }
    }

    redirectAndLogin(): void {
        this.oauthService.initCodeFlow();
    }

    loginViaPopup(): Promise<unknown> {
        return this.oauthService.initLoginFlowInPopup({
            height: 600,
            width: 600,
        });
    }

    private async finishLogin(): Promise<void> {
        if (this.router.routerState.snapshot.url.startsWith('/login')) {
            await this.loadProfile();

            const redirectUrl = this.settingsService.getAuthRedirectUrl();

            if(redirectUrl) {
                this.settingsService.clearAuthRedirectUrl();
                await this.router.navigateByUrl(redirectUrl);
            } else {
                await this.router.navigate(['/']);
            }
        }
    }

    private async loadProfile(): Promise<void> {
        const profile = await this.oauthService.loadUserProfile();

        if(profile) {
            const userInfo = this.buildUserInfo(profile);
            this.storeProfile(userInfo);
        }
    }
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private buildUserInfo(profile: any): UserInfo {
        if('info' in profile &&
            'given_name' in profile.info &&
            'family_name' in profile.info &&
            'role' in profile.info) {
            return {
                username: profile.info.name as string,
                firstName: profile.info.given_name as string,
                lastName: profile.info.family_name as string,
                roles: profile.info.role as string[]
            };
        }

        throw Error('Invalid profile!');
    }
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */

    private storeProfile(userInfo: UserInfo): void {
        this.store.dispatch(updateUserInfoRequest({ userInfo }));
    }
}
