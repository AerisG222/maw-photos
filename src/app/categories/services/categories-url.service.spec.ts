import { TestBed } from '@angular/core/testing';

import { CategoriesUrlService } from './categories-url.service';

describe('CategoriesUrlService', () => {
    let guard: CategoriesUrlService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CategoriesUrlService);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
