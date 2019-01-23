import { Component, OnInit, Inject } from '@angular/core';

import { AuthService, authServiceToken } from '../core/services/auth.service';
import { NavigationService } from '../core/services/navigation.service';

@Component({
    selector: 'app-spa-signin',
    templateUrl: './spa-signin.component.html',
    styleUrls: ['./spa-signin.component.scss']
})
export class SpaSigninComponent implements OnInit {
    constructor(
        @Inject(authServiceToken) private _authService: AuthService,
        private _navService: NavigationService) {

    }

    ngOnInit() {
        this._authService.completeAuthentication();
    }
}
