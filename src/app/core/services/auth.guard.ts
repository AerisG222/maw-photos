import { CanActivate } from '@angular/router';

export const authGuardToken = 'AuthGuard';

// https://github.com/palantir/tslint/issues/2740
export type AuthGuard = CanActivate;
