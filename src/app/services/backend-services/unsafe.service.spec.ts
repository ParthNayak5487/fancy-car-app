/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnsafeService } from './unsafe.service';

describe('Service: Unsafe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsafeService]
    });
  });

  it('should ...', inject([UnsafeService], (service: UnsafeService) => {
    expect(service).toBeTruthy();
  }));
});
