import { TestBed } from '@angular/core/testing';

import { MockAuthInitResolver } from './mock-auth-init.resolve';

describe('MockAuthInitResolver', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MockAuthInitResolver = TestBed.inject(
            MockAuthInitResolver
        );
        expect(service).toBeTruthy();
    });
});
