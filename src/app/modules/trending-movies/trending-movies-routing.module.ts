import { TrendingMoviesComponent } from './components/trending-movies/trending-movies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'trending-movies', component: TrendingMoviesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrendingMoviesRoutingModule { }
