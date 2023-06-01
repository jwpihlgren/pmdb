import { TrendingSeriesComponent } from './components/trending-series/trending-series.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'trending-series', component: TrendingSeriesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrendingSeriesRoutingModule { }
