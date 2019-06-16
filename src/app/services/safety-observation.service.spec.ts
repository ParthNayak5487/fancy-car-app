import { TestBed } from '@angular/core/testing';

import { SafetyObservationService } from './safety-observation.service';

describe('SafetyObservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SafetyObservationService = TestBed.get(SafetyObservationService);
    expect(service).toBeTruthy();
  });
});
