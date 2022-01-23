import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendingSeriesRoutingModule } from './trending-series-routing.module';
import { TrendingSeriesComponent } from './components/trending-series/trending-series.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TrendingSeriesComponent
  ],
  imports: [
    CommonModule,
    TrendingSeriesRoutingModule,
    SharedModule
  ]
})
export class TrendingSeriesModule { }
