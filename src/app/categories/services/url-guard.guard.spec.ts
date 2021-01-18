import { TestBed } from '@angular/core/testing';

import { UrlGuardGuard } from './url-guard.guard';

describe('UrlGuardGuard', () => {
  let guard: UrlGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UrlGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
