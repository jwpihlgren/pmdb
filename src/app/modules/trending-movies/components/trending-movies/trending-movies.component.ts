import { TrendingMediaService } from 'src/app/shared/services/trending-Media.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrendingMovieResponseObject } from 'src/app/shared/models/trending-movie-response-object.interface';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.css']
})
export class TrendingMoviesComponent implements OnInit {

  constructor(private trendingMoviesService: TrendingMediaService) { }

  trendingMovies$: Observable<ITrendingMovieResponseObject> = new Observable();

  ngOnInit(): void {
    this.trendingMovies$ = this.trendingMoviesService.getTrendingMovies();
  }


  requestPage(page: number):void {
    this.trendingMovies$  = this.trendingMoviesService.getTrendingMovies(page);
  }
}