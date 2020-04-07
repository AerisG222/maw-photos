import { NgModule, ModuleWithProviders } from '@angular/core';

import { searchApiServiceToken } from '../../../search/services/search-api.service';
import { ExternalSearchApiService } from '../../../search/services/external/external-search-api.service';

@NgModule()
export class ExternalServicesModule {
    static forRoot(): ModuleWithProviders<ExternalServicesModule> {
        return {
            providers: [
                { provide: searchApiServiceToken, useClass: ExternalSearchApiService }
            ],
            ngModule: ExternalServicesModule
        };
    }
}
