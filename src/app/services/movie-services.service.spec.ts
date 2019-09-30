import { TestBed } from '@angular/core/testing';

import { MovieServicesService } from './movie-services.service';

describe('MovieServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieServicesService = TestBed.get(MovieServicesService);
    expect(service).toBeTruthy();
  });
});
