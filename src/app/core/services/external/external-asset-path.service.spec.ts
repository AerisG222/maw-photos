import { TestBed } from '@angular/core/testing';

import { ExternalAssetPathService } from './external-asset-path.service';

describe('ExternalAssetPathService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalAssetPathService = TestBed.get(ExternalAssetPathService);
    expect(service).toBeTruthy();
  });
});
