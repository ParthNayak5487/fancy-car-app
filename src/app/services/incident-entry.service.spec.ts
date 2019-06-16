/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IncidentEntryService } from './incident-entry.service';

describe('Service: IncidentEntry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncidentEntryService]
    });
  });

  it('should ...', inject([IncidentEntryService], (service: IncidentEntryService) => {
    expect(service).toBeTruthy();
  }));
});
