/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NgModule, ModuleWithProviders } from '@angular/core';

import { searchApiServiceToken } from 'src/app/search/services/search-api.service';
import { ExternalSearchApiService } from 'src/app/search/services/external/external-search-api.service';

@NgModule()
export class ExternalServicesModule {
    static forRoot(): ModuleWithProviders<ExternalServicesModule> {
        return {
            providers: [
                {
                    provide: searchApiServiceToken,
                    useClass: ExternalSearchApiService,
                },
            ],
            ngModule: ExternalServicesModule,
        };
    }
}
