export const environment = {
    production: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    version: require('../../package.json').version,

    apiUrl: 'https://apidev.mikeandwan.us:5011',
    authUrl: 'https://authdev.mikeandwan.us:5001',
    photosUrl: 'http://photosdev.mikeandwan.us:4200',
    wwwUrl: 'https://wwwdev.mikeandwan.us:5021',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';
