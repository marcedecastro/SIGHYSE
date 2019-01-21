import { TestBed, inject } from '@angular/core/testing';

import { RegionesService } from './regiones.service';

describe('RegionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegionesService]
    });
  });

  it('should be created', inject([RegionesService], (service: RegionesService) => {
    expect(service).toBeTruthy();
  }));
});
