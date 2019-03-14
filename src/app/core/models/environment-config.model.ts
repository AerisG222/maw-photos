export class EnvironmentConfig {
    readonly apiUrl: string;
    readonly authUrl: string;
    readonly photosUrl: string;

    // do this dynamically rather than at build time to allow for testing the production
    // build in a non-production environment
    constructor() {
        if (window.location.hostname.indexOf('localhost') >= 0 || window.location.hostname.indexOf('dev') >= 0) {
            this.apiUrl = 'https://apidev.mikeandwan.us:5011';
            this.authUrl = 'https://authdev.mikeandwan.us:5001';
            this.photosUrl = 'http://photosdev.mikeandwan.us:4200';
        } else {
            this.apiUrl = 'https://api.mikeandwan.us';
            this.authUrl = 'https://auth.mikeandwan.us';
            this.photosUrl = 'https://photos.mikeandwan.us';
        }
    }
}
