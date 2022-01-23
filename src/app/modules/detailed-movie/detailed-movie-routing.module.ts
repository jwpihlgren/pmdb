import { DetailedMovieComponent } from './components/detailed-movie/detailed-movie.component'

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "movie/:id", component: DetailedMovieComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailedMovieRoutingModule { }
