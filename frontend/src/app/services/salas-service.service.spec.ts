import { TestBed } from '@angular/core/testing';

import { SalasServiceService } from './salas-service.service';

describe('SalasServiceService', () => {
  let service: SalasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
