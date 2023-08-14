import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrendingMovieResult } from 'src/app/shared/models/interfaces/trending-movie';
import { MovieService } from 'src/app/shared/services/movie.service';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.css']
})
export class TrendingMoviesComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private paginationService: PaginationService
    ) { }

  trendingMovies$: Observable<ITrendingMovieResult> = new Observable();

  ngOnInit(): void {
    this.getMovies();
  }

  private getMovies(page?: number | undefined): void {
    if(!page) {
      page = this.paginationService.getPageFromUrl();
    }
    this.trendingMovies$ = this.movieService.getTrendingMovies(page);
  }

  requestPage(page: number):void {
    this.paginationService.setPageInUrl(page);
    this.trendingMovies$  = this.movieService.getTrendingMovies(page);
  }
}