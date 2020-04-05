import { AuthConfig } from 'angular-oauth2-oidc';

import { config } from 'src/environments/config';

export const authConfig: AuthConfig = {
    issuer: config.authUrl,
    clientId: 'maw-photos',
    responseType: 'code',
    redirectUri: window.location.origin + '/login',
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
    scope: 'offline_access openid profile maw_api role',
    timeoutFactor: 0.5,
    sessionChecksEnabled: true,
    showDebugInformation: true,
    clearHashAfterLogin: false
};
