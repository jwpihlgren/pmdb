import { SharedModule } from '../../shared/shared.module';
import { DetailedMovieRoutingModule } from './detailed-movie-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedMovieComponent } from './components/detailed-movie/detailed-movie.component';



@NgModule({
  declarations: [
    DetailedMovieComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DetailedMovieRoutingModule
  ]
})
export class DetailedMovieModule { }
