import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { AuthConfig } from 'src/app/core/models/auth-config.model';
import { AuthService } from '../auth.service';
import { resolve } from 'q';

@Injectable()
export class ExternalAuthService implements AuthService {
    private _mgr: UserManager;
    private _user: User;

    user$ = new BehaviorSubject(null);

    constructor(cfg: AuthConfig) {
        this._mgr = new UserManager(cfg);

        this._mgr.events.addUserLoaded(user => {
            this.updateUser(user);
        });

        this._mgr.getUser().then(user => {
            this.updateUser(user);
        });
    }

    isLoggedIn(): boolean {
        return this._user != null && !this._user.expired;
    }

    getClaims(): any {
        return this._user.profile;
    }

    getAuthorizationHeaderValue(): string {
        return `${this._user.token_type} ${this._user.access_token}`;
    }

    startAuthentication(): Promise<void> {
        return this._mgr.signinRedirect();
    }

    completeAuthentication(): Promise<void> {
        return this._mgr.signinRedirectCallback().then(user => {
            this.updateUser(user);
        });
    }

    startSilentRenew(): Promise<void> {
        return this._mgr.signinSilent().then(user => {
            this.updateUser(user);
        });
    }

    completeSilentRenew(): void {
        this._mgr.signinSilentCallback().catch(error => {
            console.error(error);
        });
    }

    private updateUser(user: User) {
        this._user = user;

        this.user$.next(user);
    }
}
