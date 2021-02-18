import { TestBed } from '@angular/core/testing';

import { MockAuthGuard } from './mock-auth.guard';

describe('AuthGuard', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MockAuthGuard = TestBed.inject(MockAuthGuard);
        expect(service).toBeTruthy();
    });
});
