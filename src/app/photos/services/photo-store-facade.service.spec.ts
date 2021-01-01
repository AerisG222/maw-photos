import { TestBed } from '@angular/core/testing';

import { PhotoStoreFacadeService } from './photo-store-facade.service';

describe('PhotoStoreFacadeService', () => {
  let service: PhotoStoreFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoStoreFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
