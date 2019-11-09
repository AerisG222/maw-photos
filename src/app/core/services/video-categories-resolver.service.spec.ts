import { TestBed } from '@angular/core/testing';

import { VideoCategoriesResolverService } from './video-categories-resolver.service';

describe('VideoCategoriesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoCategoriesResolverService = TestBed.inject(VideoCategoriesResolverService);
    expect(service).toBeTruthy();
  });
});
