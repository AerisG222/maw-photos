import { TestBed } from '@angular/core/testing';

import { PhotoCategoriesResolverService } from './photo-categories-resolver.service';

describe('PhotoCategoriesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoCategoriesResolverService = TestBed.get(PhotoCategoriesResolverService);
    expect(service).toBeTruthy();
  });
});
