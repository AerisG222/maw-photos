import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(
        private authService: AuthService
    ) {
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
