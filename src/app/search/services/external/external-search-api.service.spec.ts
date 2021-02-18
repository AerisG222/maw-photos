import { TestBed } from '@angular/core/testing';

import { ExternalSearchApiService } from './external-search-api.service';

describe('ExternalSearchApiService', () => {
    let service: ExternalSearchApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ExternalSearchApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
