import { TestBed } from '@angular/core/testing';

import { VideoStoreFacadeService } from './video-store-facade.service';

describe('VideoStoreFacadeService', () => {
  let service: VideoStoreFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoStoreFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
