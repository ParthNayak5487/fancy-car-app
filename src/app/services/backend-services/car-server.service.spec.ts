/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarServerService } from './car-server.service';

describe('Service: CarServer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarServerService]
    });
  });

  it('should ...', inject([CarServerService], (service: CarServerService) => {
    expect(service).toBeTruthy();
  }));
});
