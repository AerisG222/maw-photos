import { TestBed } from '@angular/core/testing';

import { SlideshowControlService } from './slideshow-control.service';

describe('SlideshowControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlideshowControlService = TestBed.get(SlideshowControlService);
    expect(service).toBeTruthy();
  });
});
