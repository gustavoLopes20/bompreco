import { TestBed, inject } from '@angular/core/testing';

import { ResolveCidadesGuardService } from './resolve-cidades-guard.service';

describe('ResolveCidadesGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveCidadesGuardService]
    });
  });

  it('should be created', inject([ResolveCidadesGuardService], (service: ResolveCidadesGuardService) => {
    expect(service).toBeTruthy();
  }));
});
