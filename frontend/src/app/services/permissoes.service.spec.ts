import { TestBed, inject } from '@angular/core/testing';

import { PermissoesService } from './permissoes.service';

describe('PermissoesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissoesService]
    });
  });

  it('should be created', inject([PermissoesService], (service: PermissoesService) => {
    expect(service).toBeTruthy();
  }));
});
