import { Component, OnInit, Inject } from '@angular/core';

import { AuthService, authServiceToken } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-spa-signin',
    templateUrl: './spa-signin.component.html',
    styleUrls: ['./spa-signin.component.scss']
})
export class SpaSigninComponent implements OnInit {
    constructor(
        private _router: Router,
        @Inject(authServiceToken) private _authService: AuthService
    ) {

    }

    ngOnInit() {
        this._authService
            .completeAuthentication()
            .then(x => this._router.navigate([ '/' ]))
            .catch(x => console.log(`Error authenticating: ${x}`));
    }
}
