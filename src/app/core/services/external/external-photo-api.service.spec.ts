import { TestBed } from '@angular/core/testing';

import { ExternalPhotoApiService } from './external-photo-api.service';

describe('ExternalPhotoApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ExternalPhotoApiService = TestBed.inject(
            ExternalPhotoApiService
        );
        expect(service).toBeTruthy();
    });
});
