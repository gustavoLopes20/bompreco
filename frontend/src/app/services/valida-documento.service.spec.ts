import { TestBed, inject } from '@angular/core/testing';

import { ValidaDocumentoService } from './valida-documento.service';

describe('ValidaDocumentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidaDocumentoService]
    });
  });

  it('should be created', inject([ValidaDocumentoService], (service: ValidaDocumentoService) => {
    expect(service).toBeTruthy();
  }));
});
