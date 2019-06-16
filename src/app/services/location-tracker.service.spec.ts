import { TestBed, inject } from '@angular/core/testing';

import { LocationTrackerService } from './location-tracker.service';

describe('LocationTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationTrackerService]
    });
  });

  it('should be created', inject([LocationTrackerService], (service: LocationTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
