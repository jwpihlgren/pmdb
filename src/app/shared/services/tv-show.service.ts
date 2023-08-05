import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorService } from './error.service';
import { LocalStorageService } from './local-storage.service';
import { CrewService } from './crew.service';
import { PosterService } from './poster.service';
import { IRoTrendingTvResult, ITrendingTvShow } from '../models/interfaces/response-objects/ro-trending-tv-show';
import { ITrendingTvShowResult } from '../models/interfaces/trending-tv-show';
import { IDetailedTvShow } from '../models/interfaces/detailed-tv-show';
import { IRoDetailedTvShow } from '../models/interfaces/response-objects/ro-detailed-tv-show';
import { ISeason } from '../models/interfaces/season';
import { IRoSeason } from '../models/interfaces/response-objects/ro-season';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

  MS_UNTIL_EXPIRE = 1000 *  60 * 60 * 8;   /* Currently 8 hours */
  SERIE = "tv/"
  APPEND_URL = '&append_to_response=videos,credits';   
  posterBaseUrl = 'https://image.tmdb.org/t/p/w500/'
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService, 
    private localStorageService: LocalStorageService,
    private crewService: CrewService,
    private imageService: PosterService,) { }

  getTrendingTvShows(page: number = 1): Observable<ITrendingTvShowResult> {
    const storedSeries: ITrendingTvShowResult = this.localStorageService.get(`trendingSeries_Page${page}`);
    if(storedSeries && storedSeries.currentPage === page) {
      return of(storedSeries)
    }
    else {
    return this.http.get<IRoTrendingTvResult>(`${environment.TMDB_BASE_URL}/trending/tv/week?api_key=${environment.TMDB_API_KEY}&page=${page}`, {headers: this.headers})
      .pipe(
        map((response) => {
          const trendingTvResult: ITrendingTvShowResult = {
            currentPage: response.page,
            totalPages: response.total_pages,
            totalResults: response.total_results,
            results: response.results.map((tvShow: ITrendingTvShow) => {
              return {
                adult: tvShow.adult,
                id: tvShow.id,
                name: tvShow.name,
                overview: tvShow.overview,
                posterPath: this.imageService.setPosterPath(tvShow.poster_path),
                voteAverage: tvShow.vote_average,
                voteCount: tvShow.vote_count,
                firstAirDate: tvShow.first_air_date,
                popularity: tvShow.popularity,
                genreIds: tvShow.genre_ids,
                originalLanguage: tvShow.original_language,
                originalName: tvShow.original_name,
                backdropPath: this.imageService.setPosterPath(tvShow.backdrop_path),
                mediaType: tvShow.media_type,
                originCountry: tvShow.origin_country
              }
            })

          }
          return trendingTvResult
        }), catchError(this.errorService.handleError)
      )
    }
  }


  getTvShowDetails(id:number): Observable<IDetailedTvShow> {
    const storedSerie = this.localStorageService.get(`${id}`);
    if(storedSerie) {
      ;
      return of(storedSerie)
    }
    else {
      return this.http.get<IRoDetailedTvShow>(`${environment.TMDB_BASE_URL}${this.SERIE}${id}?api_key=${environment.TMDB_API_KEY}${this.APPEND_URL}`, {headers: this.headers})
      .pipe(
        map(response => {
          const tvShow: IDetailedTvShow = {
            posterPath: this.imageService.setPosterPath(response.poster_path),
            name: response.name,
            synopsis: response.overview,
            id: response.id,
            firstAirDate: response.first_air_date,
            lastAirDate: response.last_air_date,
            popularity: response.popularity,
            voteCount: response.vote_count,
            voteAverage: response.vote_average,
            episodeRuntime: response.episode_run_time,
            genres: response.genres,
            crew: this.crewService.setCrew(response.credits.crew),
            cast: this.crewService.setCast(response.credits.cast),
            videos: response.videos.results,
            numberOfEpisodes: response.number_of_episodes,
            numberOfSeasons: response.number_of_seasons,
            seasons: this.setSeasons(response.seasons),
          }

          tvShow.cast = tvShow.cast.sort((a: any, b: any) => a.order > b.order ? 1 : -1)
          tvShow.crew = tvShow.crew.sort((a: any, b: any) => a.job > b.job ? 1 : -1)
          return tvShow
        }),
        catchError(this.errorService.handleError)
      )

    }
  }

  private setSeasons(seasons: IRoSeason[]): ISeason[] {
    return seasons.map((season: IRoSeason) => {
      return {
        id: season.id,
        name: season.name,
        overview: season.overview,
        seasonNumber: season.season_number,
        posterPath: this.imageService.setPosterPath(season.poster_path),
        episodeCount: season.episode_count,
        airDate: season.air_date
      }
    })
  }
}
