import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Component({
    selector: 'app-spa-signin',
    templateUrl: './spa-signin.component.html',
    styleUrls: ['./spa-signin.component.scss']
})
export class SpaSigninComponent implements OnInit {
    constructor(
        private _authService: AuthService,
        private _navService: NavigationService) {

    }

    ngOnInit() {
        this._authService.completeAuthentication();
    }
}
