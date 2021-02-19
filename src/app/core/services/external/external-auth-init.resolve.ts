import { Injectable, Inject } from '@angular/core';

import {
    AuthInitResolver,
    authServiceToken,
    AuthService,
} from '@core/services';

@Injectable()
export class ExternalAuthInitResolver implements AuthInitResolver {
    isInitialized = false;

    constructor(@Inject(authServiceToken) private authService: AuthService) {}

    public async resolve(): Promise<boolean> {
        if (this.isInitialized) {
            return Promise.resolve(true);
        }

        await this.authService.init();

        this.isInitialized = true;

        return true;
    }
}
