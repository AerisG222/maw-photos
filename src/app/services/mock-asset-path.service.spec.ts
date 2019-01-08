import { TestBed } from '@angular/core/testing';

import { MockAssetPathService } from './mock-asset-path.service';

describe('MockAssetPathService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockAssetPathService = TestBed.get(MockAssetPathService);
    expect(service).toBeTruthy();
  });
});
