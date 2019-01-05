export const AUTH_SERVICE = 'AUTH_SERVICE';

export interface IAuthService {
    isLoggedIn(): boolean;
    getClaims(): any;
    getAuthorizationHeaderValue(): string;
    startAuthentication(): Promise<void>;
    completeAuthentication(): Promise<void>;
}
