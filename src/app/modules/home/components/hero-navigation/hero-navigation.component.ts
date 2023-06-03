import { Router } from '@angular/router';
import { TrendingMediaService } from './../../../../shared/services/trending-Media.service';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ITrendingMovie } from 'src/app/shared/models/trending-movie-response-object.interface';
import { ITrendingTv } from 'src/app/shared/models/trending-tv-response-object.interface';

@Component({
  selector: 'app-hero-navigation',
  templateUrl: './hero-navigation.component.html',
  styleUrls: ['./hero-navigation.component.css']
})
export class HeroNavigationComponent implements OnInit {

  constructor(
    private trendingMediaService: TrendingMediaService,
    private router: Router
    ) { }

  trendiestMovie$!: Observable<ITrendingMovie>
  trendiestTv$!: Observable<ITrendingTv>

  config: IHeroNavigationConfig = {
    movieButtonTitle: 'More movies',
    trendingMoviesRoute: '/trending-movies',
    detailedMovieRoute: '/movie',
    tvButtonTitle: 'More series',
    trendingTvRoute: '/trending-series',
    detailedTvRoute: '/tv'
  }

  ngOnInit(): void {
    this.trendiestMovie$ = this.trendingMediaService.getTrendingMovies().pipe(
      map((response) => response.results[0])
    )
    this.trendiestTv$ = this.trendingMediaService.getTrendingSeries().pipe(
      map((response) => response.results[0])
    )
  }

  navigate(route: string): void {
    this.router.navigateByUrl(route)
  }

}

interface IHeroNavigationConfig {
  movieButtonTitle: string
  trendingMoviesRoute: string
  detailedMovieRoute: string
  tvButtonTitle: string
  trendingTvRoute: string
  detailedTvRoute: string
}
