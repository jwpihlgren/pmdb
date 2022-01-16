import { TrendingMoviesService } from './../../../../shared/services/trending-movies.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private trendingMoviesService: TrendingMoviesService) { }

  movies$: Observable<Movie[]> = new Observable();

  ngOnInit(): void {
    this.movies$ = this.trendingMoviesService.getTrendingMovies();

  }
}
