import { InjectionToken } from '@angular/core';
import { Resolve } from '@angular/router';

export const authInitResolverToken = new InjectionToken<AuthInitResolver>(
    'AuthInitResolver'
);

// https://github.com/palantir/tslint/issues/2740
export type AuthInitResolver = Resolve<boolean>;
