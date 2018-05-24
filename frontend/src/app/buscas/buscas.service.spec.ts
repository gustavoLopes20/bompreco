import { TestBed, inject } from '@angular/core/testing';

import { BuscasService } from './buscas.service';

describe('BuscasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscasService]
    });
  });

  it('should be created', inject([BuscasService], (service: BuscasService) => {
    expect(service).toBeTruthy();
  }));
});
