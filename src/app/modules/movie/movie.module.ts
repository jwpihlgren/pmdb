import { MovieRoutingModule } from './movie-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedMovieComponent } from './components/detailed-movie/detailed-movie.component';



@NgModule({
  declarations: [
    DetailedMovieComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule
  ]
})
export class MovieModule { }
