/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

export const environment = {
    production: false,
    version: require('../../package.json').version as string,

    apiUrl: 'https://dev.api.mikeandwan.us',
    authUrl: 'https://dev.auth.mikeandwan.us',
    photosUrl: 'http://dev.photos.mikeandwan.us',
    wwwUrl: 'https://dev.www.mikeandwan.us',
};
