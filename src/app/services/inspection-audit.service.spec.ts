import { TestBed } from '@angular/core/testing';

import { InspectionAuditService } from './inspection-audit.service';

describe('InspectionAuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InspectionAuditService = TestBed.get(InspectionAuditService);
    expect(service).toBeTruthy();
  });
});
