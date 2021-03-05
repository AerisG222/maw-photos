import { InjectionToken } from '@angular/core';

export const authServiceToken = new InjectionToken<AuthService>('AuthService');

export interface AuthService {
    init(): Promise<void>;
    handleLoginCallback(): Promise<void>;
    redirectAndLogin(): void;
    loginViaPopup(): Promise<unknown>;
}
