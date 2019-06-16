import { TestBed, inject } from '@angular/core/testing';

import { ApplicationHelperService } from './application-helper.service';

describe('ApplicationHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationHelperService]
    });
  });

  it('should be created', inject([ApplicationHelperService], (service: ApplicationHelperService) => {
    expect(service).toBeTruthy();
  }));
});
