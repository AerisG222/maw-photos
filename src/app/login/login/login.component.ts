import { Component, Inject } from '@angular/core';

import { AuthService, authServiceToken } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { first, filter, tap } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
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
                tap(p => this.showLogin = false)
            )
            .subscribe();

        this.authService.handleLoginCallback();
    }

    redirectLogin() {
        this.authService.redirectAndLogin();
    }

    /*
    private async loginViaPopup() {
        await this.oauthService.loadDiscoveryDocument();
        sessionStorage.setItem('flow', 'implicit');

        this.oauthService.initLoginFlowInPopup({ height: 600, width: 600 });
    }
    */
}
