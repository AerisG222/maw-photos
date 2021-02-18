import { TestBed } from '@angular/core/testing';

import { MockPhotoApiService } from './mock-photo-api.service';

describe('MockPhotoApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MockPhotoApiService = TestBed.inject(
            MockPhotoApiService
        );
        expect(service).toBeTruthy();
    });
});
