/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

export const environment = {
    production: false,
    version: require('../../package.json').version as string,

    apiUrl: 'https://apidev.mikeandwan.us',
    authUrl: 'https://authdev.mikeandwan.us',
    photosUrl: 'http://photosdev.mikeandwan.us',
    wwwUrl: 'https://wwwdev.mikeandwan.us',
};
