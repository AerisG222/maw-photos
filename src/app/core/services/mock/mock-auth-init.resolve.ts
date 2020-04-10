import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthInitResolver } from 'src/app/core/services/auth-init.resolver';

@Injectable()
export class MockAuthInitResolver implements AuthInitResolver {
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return true;
    }
}
