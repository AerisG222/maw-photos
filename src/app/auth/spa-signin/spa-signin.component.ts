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
        private router: Router,
        private settingsSvc: SettingsService,
        @Inject(authServiceToken) private authService: AuthService
    ) {

    }

    ngOnInit() {
        this.authService
            .completeAuthentication()
            .then(x => {
                const destUrl = this.settingsSvc.getAuthRedirectUrl();

                if (destUrl != null) {
                    this.settingsSvc.clearAuthRedirectUrl();
                    this.router.navigate([ destUrl ]);
                } else {
                    this.router.navigate([ '/' ]);
                }
            })
            .catch(x => console.log(`Error authenticating: ${x}`));
    }
}
