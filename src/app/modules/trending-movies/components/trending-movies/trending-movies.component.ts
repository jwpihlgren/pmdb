import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrendingMovieResponseObject } from 'src/app/shared/models/interfaces/response-objects/trending-movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.css']
})
export class TrendingMoviesComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  trendingMovies$: Observable<ITrendingMovieResponseObject> = new Observable();

  ngOnInit(): void {
    this.trendingMovies$ = this.movieService.getTrendingMovies();
  }


  requestPage(page: number):void {
    this.trendingMovies$  = this.movieService.getTrendingMovies(page);
  }
}