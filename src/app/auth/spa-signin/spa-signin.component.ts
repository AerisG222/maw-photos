import { Component, OnInit, Inject } from '@angular/core';

import { AuthService, authServiceToken } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-spa-signin',
    templateUrl: './spa-signin.component.html',
    styleUrls: ['./spa-signin.component.scss']
})
export class SpaSigninComponent implements OnInit {
    constructor(
        @Inject(authServiceToken) private _authService: AuthService
    ) {

    }

    ngOnInit() {
        this._authService.completeAuthentication();
    }
}
