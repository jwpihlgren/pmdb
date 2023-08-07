import { Router } from '@angular/router';
import { MovieService } from '../../../../shared/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ITrendingTvShowItem } from 'src/app/shared/models/interfaces/trending-tv-show';
import { TvShowService } from 'src/app/shared/services/tv-show.service';
import { ITrendingMovieItem} from 'src/app/shared/models/interfaces/trending-movie';


@Component({
  selector: 'app-hero-navigation',
  templateUrl: './hero-navigation.component.html',
  styleUrls: ['./hero-navigation.component.css']
})
export class HeroNavigationComponent implements OnInit {

  constructor(
    private movieServie: MovieService,
    private tvShowService: TvShowService,
    private router: Router
    ) { }

  trendiestMovie$!: Observable<ITrendingMovieItem>
  trendiestTv$!: Observable<ITrendingTvShowItem>

  config: IHeroNavigationConfig = {
    movieButtonTitle: 'More movies',
    trendingMoviesRoute: '/trending-movies',
    detailedMovieRoute: '/movie',
    tvButtonTitle: 'More series',
    trendingTvRoute: '/trending-series',
    detailedTvRoute: '/tv'
  }

  ngOnInit(): void {
    this.trendiestMovie$ = this.movieServie.getTrendingMovies().pipe(
      map((response) => response.results[0])
    )
    this.trendiestTv$ = this.tvShowService.getTrendingTvShows().pipe(
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
