import { AuthConfig } from 'angular-oauth2-oidc';

import { environment } from 'src/environments/environment';

export const authConfig: AuthConfig = {
    issuer: environment.authUrl,
    clientId: 'maw-photos',
    responseType: 'code',
    redirectUri: window.location.origin + '/login',
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
    scope: 'offline_access openid profile maw_api role',
    timeoutFactor: 0.5,
    sessionChecksEnabled: true,
    showDebugInformation: environment.production === false,
    clearHashAfterLogin: false
};
