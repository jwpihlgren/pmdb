import { TestBed } from '@angular/core/testing';

import { TrendingMediaService } from './trending-Media.service';

describe('TrendingMoviesService', () => {
  let service: TrendingMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendingMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
