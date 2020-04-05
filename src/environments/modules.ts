import { MockServicesModule } from 'src/app/core/services/mock/mock-services.module';
import { ExternalServicesModule } from 'src/app/core/services/external/external-services.module';

export const modules = {
    // servicesModule: MockServicesModule  // use this for dev / testing of app functionality
    servicesModule: ExternalServicesModule  // use this for integration testing / hitting the actual webservices
};
