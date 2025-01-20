import { ProductionService } from './production.service';
import { ErrorService } from './error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';
import { IDetailedMovie } from '../models/interfaces/detailed-movie';
import { CrewService } from './crew.service';
import { PosterService } from './poster.service';
import { TmdbConfigService } from './tmdb-config.service';
import { IRoVideo } from '../models/interfaces/response-objects/ro-Video';
import { IVideo } from '../models/interfaces/video';
import { IRoDetailedMovie } from '../models/interfaces/response-objects/ro-detailed-movie';
import { ITrendingMovieResult } from '../models/interfaces/trending-movie';
import { IRoTrendingMovieItem, IRoTrendingMovieResult } from '../models/interfaces/response-objects/ro-trending-movie';
import IroMovieRecommendation from '../models/interfaces/response-objects/ro-movie-recommendation';
import { ICardOptions } from '../components/card/card.component';


@Injectable({
  providedIn: 'root'
})
export class
  MovieService {

  MS_UNTIL_EXPIRE = 1000 * 60 * 60 * 8;   /* Currently 8 hours */
  MOVIE = "movie/";
  APPEND_URL = '&append_to_response=videos,credits,recommendations';
  posterBaseUrl = 'https://image.tmdb.org/t/p/w500/'
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private localStorageService: LocalStorageService,
    private tmdbConfigService: TmdbConfigService,
    private crewService: CrewService,
    private imageService: PosterService,
    private productionService: ProductionService
  ) { }

  getTrendingMovies(page: number = 1): Observable<ITrendingMovieResult> {
    const storedMovies: ITrendingMovieResult = this.localStorageService.get(`trendingMovies_Page${page}`);
    if (storedMovies && storedMovies.page === page) {
      return of(storedMovies)
    }
    else {
      return this.http.get<IRoTrendingMovieResult>(`${environment.TMDB_BASE_URL}trending/movie/week?api_key=${environment.TMDB_API_KEY}&page=${page}`, { headers: this.headers })
        .pipe(
          map((response) => {
            const trendingMovieResult: ITrendingMovieResult = {
              page: response.page,
              totalPages: response.total_pages,
              totalResults: response.total_results,
              results: response.results.map((movie: IRoTrendingMovieItem) => {
                return {
                  adult: movie.adult,
                  id: movie.id,
                  overview: movie.overview,
                  posterPath: this.imageService.setPosterPath(movie.poster_path),
                  releaseDate: movie.release_date,
                  title: movie.title,
                  voteAverage: movie.vote_average,
                  voteCount: movie.vote_count,
                  popularity: movie.popularity,
                  originalLanguage: movie.original_language,
                  originalTitle: movie.original_title,
                  genreIds: movie.genre_ids
                }
              }),
            }
            this.localStorageService.set(`trendingMovies_Page${page}`, trendingMovieResult, this.MS_UNTIL_EXPIRE)
            return trendingMovieResult;

          }), catchError(this.errorService.handleError)
        )
    }
  }

  getMovieDetails(id: number): Observable<IDetailedMovie> {
    this.tmdbConfigService.getConfig();
    const storedMovie = this.localStorageService.get(`${id}`);
    if (storedMovie) {

      return of(storedMovie)
    }
    else {
      return this.http.get<IRoDetailedMovie>(`${environment.TMDB_BASE_URL}${this.MOVIE}${id}?api_key=${environment.TMDB_API_KEY}${this.APPEND_URL}`, { headers: this.headers })
        .pipe(
          map(response => {
            console.log(response)
            const movie: IDetailedMovie = {
              posterPath: this.imageService.setPosterPath(response.poster_path),
              productionCompanies: this.productionService.setProductionCompanies(response.production_companies),
              productionCountries: this.productionService.setProductionCountries(response.production_countries),
              title: response.title,
              synopsis: response.overview,
              id: response.id,
              imdbId: response.imdb_id,
              releaseDate: response.release_date,
              popularity: response.popularity,
              voteAverage: response.vote_average,
              voteCount: response.vote_count,
              genres: response.genres,
              runtime: response.runtime,
              cast: this.crewService.setCast(response.credits.cast),
              crew: this.crewService.setCrew(response.credits.crew),
              video: this.setVideo(response.videos),
              recommendations: this.setRecommendations(response.recommendations)
            }

            this.localStorageService.set(`${id}`, movie, this.MS_UNTIL_EXPIRE)
            return movie;
          }),
          catchError(this.errorService.handleError)
        )
    }
  }

  setVideo(videos: IRoVideo): IVideo | undefined {
    if (videos.results.length < 1) return undefined
    const video: IVideo = {
      url: videos.results[0].key
    }
    return video
  }
  setRecommendations(recommendations: IroMovieRecommendation): ICardOptions[] | undefined {
    if (!recommendations) return undefined
    const results = recommendations.results
    const parsedRecommendations: ICardOptions[] = results.map(result => {
      const parsed: ICardOptions = {
        id: result.id,
        posterPath: this.imageService.setPosterPath(result.poster_path),
        title: result.title,
        voteAverage: result.vote_average,
        description: result.overview,
        stub: "movie", //<--- this is not good, in trending movie component we even set this in the template...
        year: result.release_date
      }
      return parsed
    })

    return parsedRecommendations
  }
}

