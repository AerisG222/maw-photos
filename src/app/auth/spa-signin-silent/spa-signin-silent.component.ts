import { Component, OnInit, Inject } from '@angular/core';

import { authServiceToken, AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-spa-signin-silent',
    templateUrl: './spa-signin-silent.component.html',
    styleUrls: ['./spa-signin-silent.component.scss']
})
export class SpaSigninSilentComponent implements OnInit {
    constructor(
        @Inject(authServiceToken) private _authService: AuthService
    ) { }

    ngOnInit() {
        this._authService.completeSilentRenew();
    }
}
