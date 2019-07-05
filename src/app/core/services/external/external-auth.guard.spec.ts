import { TestBed } from '@angular/core/testing';

import { ExternalAuthGuard } from './external-auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalAuthGuard = TestBed.get(ExternalAuthGuard);
    expect(service).toBeTruthy();
  });
});
