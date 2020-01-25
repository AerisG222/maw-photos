import { TestBed } from '@angular/core/testing';

import { MockSearchApiService } from './mock-search-api.service';

describe('MockSearchApiService', () => {
  let service: MockSearchApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockSearchApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
