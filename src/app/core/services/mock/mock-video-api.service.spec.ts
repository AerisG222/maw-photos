import { TestBed } from '@angular/core/testing';

import { MockVideoApiService } from './mock-video-api.service';

describe('MockVideoApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MockVideoApiService = TestBed.inject(
            MockVideoApiService
        );
        expect(service).toBeTruthy();
    });
});
