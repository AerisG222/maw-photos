import { Injectable, Inject } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthInitResolver } from '../auth-init.resolver';
import { authServiceToken, AuthService } from '../auth.service';

@Injectable()
export class ExternalAuthInitResolver implements AuthInitResolver {
    isInitialized = false;

    constructor(
        @Inject(authServiceToken) private authService: AuthService,
    ) {

    }

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (this.isInitialized)
        {
            return Promise.resolve(true);
        }

        await this.authService.init();

        this.isInitialized = true;

        return true;
    }
}