import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';

import { AuthService, authServiceToken } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { first, filter, tap } from 'rxjs/operators';

@Component({
    selector: 'app-login-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
                filter(p => p.has('code')),
                tap(p => this.showLogin = false),
                tap(p => this.authService.handleLoginCallback())
            )
            .subscribe();

        // otherwise show login screen and try to use popup
        this.activatedRoute.queryParamMap
            .pipe(
                first(),
                filter(p => !p.has('code')),
                tap(p => this.showLogin = true),
                tap(p => this.authService.loginViaPopup())
            )
            .subscribe();
    }

    redirectLogin() {
        this.authService.redirectAndLogin();
    }
}
