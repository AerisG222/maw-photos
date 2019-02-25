import { TestBed } from '@angular/core/testing';

import { ExternalVideoApiService } from './external-video-api.service';

describe('ExternalVideoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalVideoApiService = TestBed.get(ExternalVideoApiService);
    expect(service).toBeTruthy();
  });
});
