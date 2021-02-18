import { TestBed } from '@angular/core/testing';

import { PhotosUrlService } from './photos-url.service';

describe('PhotosUrlService', () => {
    let service: PhotosUrlService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PhotosUrlService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
