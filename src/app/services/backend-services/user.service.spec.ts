/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserBackendService } from './user.service';

describe('Service: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserBackendService]
    });
  });

  it('should ...', inject([UserBackendService], (service: UserBackendService) => {
    expect(service).toBeTruthy();
  }));
});
