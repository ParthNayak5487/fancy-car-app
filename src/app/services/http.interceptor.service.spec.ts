import { TestBed, inject } from '@angular/core/testing';

import { Http.InterceptorService } from './http.interceptor.service';

describe('Http.InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Http.InterceptorService]
    });
  });

  it('should be created', inject([Http.InterceptorService], (service: Http.InterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
