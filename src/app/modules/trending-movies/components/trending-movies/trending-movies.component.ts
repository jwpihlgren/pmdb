import { TrendingMediaService } from 'src/app/shared/services/trending-Media.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from 'src/app/shared/models/media';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.css']
})
export class TrendingMoviesComponent implements OnInit {

  constructor(private trendingMoviesService: TrendingMediaService) { }

  movies$: Observable<Media[]> = new Observable();

  ngOnInit(): void {
    this.movies$ = this.trendingMoviesService.getTrendingMovies();
  }
}