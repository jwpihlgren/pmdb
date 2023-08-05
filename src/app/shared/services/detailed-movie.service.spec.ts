import { TestBed } from '@angular/core/testing';

import { DetailedMovieService as DetailedMovieService } from './detailed-movie.service';

describe('MovieService', () => {
  let service: DetailedMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailedMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
