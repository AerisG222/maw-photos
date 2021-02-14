import { TestBed } from '@angular/core/testing';

import { ViewModeGuard } from './view-mode.guard';

describe('ViewModeGuard', () => {
  let guard: ViewModeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewModeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
