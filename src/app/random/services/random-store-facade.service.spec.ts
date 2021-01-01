import { TestBed } from '@angular/core/testing';

import { RandomStoreFacadeService } from './random-store-facade.service';

describe('RandomStoreFacadeService', () => {
  let service: RandomStoreFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomStoreFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
