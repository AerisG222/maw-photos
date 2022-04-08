/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

export const environment = {
    production: false,
    version: require('../../package.json').version as string,

    apiUrl: 'https://test.api.mikeandwan.us:8443',
    authUrl: 'https://test.auth.mikeandwan.us:8443',
    photosUrl: 'https://test.photos.mikeandwan.us:8443',
    wwwUrl: 'https://test.www.mikeandwan.us:8443',
};
