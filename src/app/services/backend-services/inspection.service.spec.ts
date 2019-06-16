/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspectionService } from './inspection.service';

describe('Service: Inspection', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionService]
    });
  });

  it('should ...', inject([InspectionService], (service: InspectionService) => {
    expect(service).toBeTruthy();
  }));
});
