import { TestBed } from '@angular/core/testing';

import { ExifFormatterService } from './exif-formatter.service';

describe('ExifFormatterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExifFormatterService = TestBed.get(ExifFormatterService);
    expect(service).toBeTruthy();
  });
});
