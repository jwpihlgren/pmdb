import { TestBed } from '@angular/core/testing';

import { DetailedTvShowService } from './detailed-tv-show.service';

describe('DetailedTvShowService', () => {
  let service: DetailedTvShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailedTvShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
