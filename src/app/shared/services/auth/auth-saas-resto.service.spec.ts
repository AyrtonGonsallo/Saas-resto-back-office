import { TestBed } from '@angular/core/testing';

import { AuthSaasRestoService } from './auth-saas-resto.service';

describe('AuthSaasRestoService', () => {
  let service: AuthSaasRestoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSaasRestoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
