import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { AuthConfig } from 'src/app/core/models/auth-config.model';
import { AuthService } from '../auth.service';
import { resolve } from 'q';

@Injectable()
export class ExternalAuthService implements AuthService {
    private mgr: UserManager;
    private user: User;

    user$ = new BehaviorSubject(null);

    constructor(cfg: AuthConfig) {
        const settings = {
            authority: cfg.authority,
            client_id: cfg.clientId,
            post_logout_redirect_uri: cfg.postLogoutRedirectUri,
            redirect_uri: cfg.redirectUri,
            silent_redirect_uri: cfg.silentRedirectUri,
            load_user_info: cfg.loadUserInfo,
            automatic_silent_renew: cfg.automaticSilentRenew,
            filter_protocol_claims: cfg.filterProtocolClaims,
            response_type: cfg.responseType,
            scope: cfg.scope
        } as UserManagerSettings;

        this.mgr = new UserManager(settings);

        this.mgr.events.addUserLoaded(user => {
            this.updateUser(user);
        });

        this.mgr.getUser().then(user => {
            this.updateUser(user);
        });
    }

    isLoggedIn(): boolean {
        return this.user != null && !this.user.expired;
    }

    getClaims(): any {
        return this.user.profile;
    }

    getAuthorizationHeaderValue(): string {
        return `${this.user.token_type} ${this.user.access_token}`;
    }

    startAuthentication(): Promise<void> {
        return this.mgr.signinRedirect();
    }

    completeAuthentication(): Promise<void> {
        return this.mgr.signinRedirectCallback().then(user => {
            this.updateUser(user);
        });
    }

    startSilentRenew(): Promise<void> {
        return this.mgr.signinSilent().then(user => {
            this.updateUser(user);
        });
    }

    completeSilentRenew(): void {
        this.mgr.signinSilentCallback().catch(error => {
            console.error(error);
        });
    }

    private updateUser(user: User) {
        this.user = user;

        this.user$.next(user);
    }
}
