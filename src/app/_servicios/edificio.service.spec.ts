import { TestBed, inject } from '@angular/core/testing';

import { EdificioService } from './edificio.service';

describe('EdificioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdificioService]
    });
  });

  it('should be created', inject([EdificioService], (service: EdificioService) => {
    expect(service).toBeTruthy();
  }));
});
