import { TestBed, inject } from '@angular/core/testing';

import { MatafuegosService } from './matafuegos.service';

describe('MatafuegosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatafuegosService]
    });
  });

  it('should be created', inject([MatafuegosService], (service: MatafuegosService) => {
    expect(service).toBeTruthy();
  }));
});
