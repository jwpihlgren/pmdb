import { TestBed } from '@angular/core/testing';

import { DetailedMediaService } from './detailed-media.service';

describe('MovieService', () => {
  let service: DetailedMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailedMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
