import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthInitResolver } from '@core/services';

@Injectable()
export class MockAuthInitResolver implements AuthInitResolver {
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return true;
    }
}
