import { ExternalServicesModule } from 'src/app/core/services/external/external-services.module';

export const environment = {
    production: true,
    version: require('../../package.json').version,
    servicesModule: ExternalServicesModule
};
