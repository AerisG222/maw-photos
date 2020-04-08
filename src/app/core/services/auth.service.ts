import { InjectionToken } from '@angular/core';

export const authServiceToken = new InjectionToken<AuthService>('AuthService');

export interface AuthService {
    init();
    handleLoginCallback();
    redirectAndLogin();
    loginViaPopup();
}
