import { TestBed } from '@angular/core/testing';

import { CookiesserviceService } from './cookiesservice.service';

describe('CookiesserviceService', () => {
  let service: CookiesserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiesserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
