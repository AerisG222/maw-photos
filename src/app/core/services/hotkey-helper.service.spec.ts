import { TestBed } from '@angular/core/testing';

import { HotkeyHelperService } from './hotkey-helper.service';

describe('HotkeyHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotkeyHelperService = TestBed.get(HotkeyHelperService);
    expect(service).toBeTruthy();
  });
});
