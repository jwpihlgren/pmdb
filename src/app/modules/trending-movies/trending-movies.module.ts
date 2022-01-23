import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendingMoviesRoutingModule } from './trending-movies-routing.module';
import { TrendingMoviesComponent } from './components/trending-movies/trending-movies.component';


@NgModule({
  declarations: [
    TrendingMoviesComponent
  ],
  imports: [
    CommonModule,
    TrendingMoviesRoutingModule,
    SharedModule
  ]
})
export class TrendingMoviesModule { }
