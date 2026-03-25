import { TestBed } from '@angular/core/testing';

import { CrudSaasRestoService } from './crud-saas-resto.service';

describe('CrudSaasRestoService', () => {
  let service: CrudSaasRestoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudSaasRestoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
