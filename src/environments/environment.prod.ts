/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

export const environment = {
    production: true,
    version: require('../../package.json').version as string,

    apiUrl: 'https://api.mikeandwan.us',
    authUrl: 'https://auth.mikeandwan.us',
    photosUrl: 'https://photos.mikeandwan.us',
    wwwUrl: 'https://www.mikeandwan.us',
};
