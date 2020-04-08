import { TestBed } from '@angular/core/testing';

import { ExternalAuthInitResolver } from './external-auth-init.resolve';

describe('ExternalAuthInitResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalAuthInitResolver = TestBed.inject(ExternalAuthInitResolver);
    expect(service).toBeTruthy();
  });
});
