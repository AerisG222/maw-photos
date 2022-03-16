/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

export const environment = {
    production: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    version: require('../../package.json').version as string,

    apiUrl: 'https://local.api.mikeandwan.us:5011',
    authUrl: 'https://local.auth.mikeandwan.us:5001',
    photosUrl: 'http://local.photos.mikeandwan.us:4200',
    wwwUrl: 'https://local.www.mikeandwan.us:5021',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';
