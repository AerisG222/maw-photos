import { TestBed } from '@angular/core/testing';

import { ExternalAuthService } from './external-auth.service';

describe('ExternalAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalAuthService = TestBed.get(ExternalAuthService);
    expect(service).toBeTruthy();
  });
});
