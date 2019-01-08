import { TestBed } from '@angular/core/testing';

import { AssetPathService } from './asset-path.service';

describe('AssetPathService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetPathService = TestBed.get(AssetPathService);
    expect(service).toBeTruthy();
  });
});
