import { TestBed } from '@angular/core/testing';

import { EffectStyleBuilderService } from './effect-style-builder.service';

describe('EffectStyleBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EffectStyleBuilderService = TestBed.inject(EffectStyleBuilderService);
    expect(service).toBeTruthy();
  });
});
