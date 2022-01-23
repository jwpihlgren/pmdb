import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSeriesComponent } from './detailed-series.component';

describe('DetailedSeriesComponent', () => {
  let component: DetailedSeriesComponent;
  let fixture: ComponentFixture<DetailedSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
