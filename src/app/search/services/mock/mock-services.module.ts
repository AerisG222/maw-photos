/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NgModule, ModuleWithProviders } from '@angular/core';

import { searchApiServiceToken } from 'src/app/search/services/search-api.service';
import { MockSearchApiService } from 'src/app/search/services/mock/mock-search-api.service';

@NgModule()
export class MockServicesModule {
    static forRoot(): ModuleWithProviders<MockServicesModule> {
        return {
            providers: [
                {
                    provide: searchApiServiceToken,
                    useClass: MockSearchApiService,
                },
            ],
            ngModule: MockServicesModule,
        };
    }
}
