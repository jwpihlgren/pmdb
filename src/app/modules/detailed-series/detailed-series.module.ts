import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailedSeriesRoutingModule } from './detailed-series-routing.module';
import { DetailedSeriesComponent } from './components/detailed-series/detailed-series.component';


@NgModule({
  declarations: [
    DetailedSeriesComponent
  ],
  imports: [
    CommonModule,
    DetailedSeriesRoutingModule
  ]
})
export class DetailedSeriesModule { }
