import { Component, OnInit, Inject } from '@angular/core';

import { AuthService, authServiceToken } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
    selector: 'app-spa-signin',
    templateUrl: './spa-signin.component.html',
    styleUrls: ['./spa-signin.component.scss']
})
export class SpaSigninComponent implements OnInit {
    constructor(
        private _router: Router,
        private _settingsSvc: SettingsService,
        @Inject(authServiceToken) private _authService: AuthService
    ) {

    }

    ngOnInit() {
        this._authService
            .completeAuthentication()
            .then(x => {
                const destUrl = this._settingsSvc.getAuthRedirectUrl();

                if (destUrl != null) {
                    this._settingsSvc.clearAuthRedirectUrl();
                    this._router.navigate([ destUrl ]);
                } else {
                    this._router.navigate([ '/' ]);
                }
            })
            .catch(x => console.log(`Error authenticating: ${x}`));
    }
}
