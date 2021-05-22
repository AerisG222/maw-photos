import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';

import { AuthService, authServiceToken } from '@core/services';
import { ActivatedRoute } from '@angular/router';
import { first, filter, tap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-login-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    showLogin = true;

    constructor(
        private activatedRoute: ActivatedRoute,
        @Inject(authServiceToken) private authService: AuthService
    ) {
        // hide view when trying to process login callback
        this.activatedRoute.queryParamMap
            .pipe(
                first(),
                filter((p) => p.has('code')),
                tap(() => (this.showLogin = false)),
                switchMap(() => this.authService.handleLoginCallback())
            )
            .subscribe();

        // otherwise show login screen and try to use popup
        this.activatedRoute.queryParamMap
            .pipe(
                first(),
                filter((p) => !p.has('code')),
                tap(() => (this.showLogin = true)),
                switchMap(() => this.authService.loginViaPopup())
            )
            .subscribe();
    }

    redirectLogin(): void {
        this.authService.redirectAndLogin();
    }
}
