export const environment = {
    production: false,
    version: require('../../package.json').version,

    apiUrl: 'https://apidev.mikeandwan.us',
    authUrl: 'https://authdev.mikeandwan.us',
    photosUrl: 'http://photosdev.mikeandwan.us',
    wwwUrl: 'https://wwwdev.mikeandwan.us'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';
