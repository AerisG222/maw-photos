export const authServiceToken = 'AuthService';

export interface AuthService {
    isLoggedIn(): boolean;
    getClaims(): any;
    getAuthorizationHeaderValue(): string;
    startAuthentication(): Promise<void>;
    completeAuthentication(): Promise<void>;
}