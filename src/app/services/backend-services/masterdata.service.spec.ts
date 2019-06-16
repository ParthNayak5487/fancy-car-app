/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MasterdataService } from './masterdata.service';

describe('Service: Masterdata', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterdataService]
    });
  });

  it('should ...', inject([MasterdataService], (service: MasterdataService) => {
    expect(service).toBeTruthy();
  }));
});
