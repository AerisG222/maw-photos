import { TestBed } from '@angular/core/testing';

import { RandomControlService } from './random-control.service';

describe('RandomControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomControlService = TestBed.get(RandomControlService);
    expect(service).toBeTruthy();
  });
});
