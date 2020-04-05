import { InjectionToken } from '@angular/core';
import { CanActivate } from '@angular/router';

export const authGuardToken = new InjectionToken<AuthGuard>('AuthGuard');

// https://github.com/palantir/tslint/issues/2740
export type AuthGuard = CanActivate;
