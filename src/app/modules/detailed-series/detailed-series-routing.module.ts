import { DetailedSeriesComponent } from './components/detailed-series/detailed-series.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'tv/:id', component: DetailedSeriesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailedSeriesRoutingModule { }
