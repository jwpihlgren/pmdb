import { ErrorService } from './error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';  
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';
import { ITrendingMovieResponseObject } from '../models/interfaces/response-objects/trending-movie';
import { DetailedMovie } from '../models/interfaces/detailed-movie';
import { IDetailedMovieResponseObject } from '../models/interfaces/response-objects/detailed-movie';
import { CrewService } from './crew.service';
import { ImageService } from './image.service';
import { TmdbConfigService } from './tmdb-config.service';
import { ITrendingMovie } from '../models/interfaces/trending-movie';


@Injectable({
  providedIn: 'root'
})
export class 
MovieService {

  MS_UNTIL_EXPIRE = 1000 *  60 * 60 * 8;   /* Currently 8 hours */
  MOVIE = "movie/";
  APPEND_URL = '&append_to_response=videos,credits';
  posterBaseUrl = 'https://image.tmdb.org/t/p/w500/'
  headers = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(
    private http: HttpClient, 
    private errorService: ErrorService, 
    private localStorageService: LocalStorageService,
    private tmdbConfigService:TmdbConfigService,
    private crewService: CrewService,
    private imageService: ImageService,
    ) { }
    
  getTrendingMovies(page: number = 1): Observable<ITrendingMovie[]> {
    const storedMovies: ITrendingMovieResponseObject = this.localStorageService.get(`trendingMovies_Page${page}`);
    if(storedMovies && storedMovies.page === page) {
      return of(storedMovies)
    }
    else {
    return this.http.get<ITrendingMovieResponseObject>(`${environment.TMDB_BASE_URL}/trending/movie/week?api_key=${environment.TMDB_API_KEY}&page=${page}`, {headers: this.headers})
      .pipe(
        map((response) => {        
          const trendingMovies: ITrendingMovie[] = []
          return trendingMovies

        }), catchError(this.errorService.handleError)
      )
    }
  }

  getMovieDetails(id: number): Observable<DetailedMovie> {
    this.tmdbConfigService.getConfig();
    const storedMovie = this.localStorageService.get(`${id}`);
    if(storedMovie) {
      
      return of(storedMovie)
    }
    else {
      return this.http.get<IDetailedMovieResponseObject>(`${environment.TMDB_BASE_URL}${this.MOVIE}${id}?api_key=${environment.TMDB_API_KEY}${this.APPEND_URL}`, {headers: this.headers})
      .pipe(
        map(data => {
          const movie: DetailedMovie = {
            poster_path: this.imageService.setPosterPath(data.poster_path),
            title: data.title,
            synopsis: data.overview,
            id: data.id,
            releaseDate: data.release_date,
            popularity: data.popularity,
            voteCount: data.vote_count,
            voteAverage: data.vote_average,
            genres: data.genres,
            runtime: data.runtime,
            cast: this.crewService.setCast(data.credits!.cast),
            crew: this.crewService.setCrew(data.credits!.crew),
            videoExists: data.video,
            videos: data.videos!.results,
          }
          
          this.localStorageService.set(`${id}`, movie, this.MS_UNTIL_EXPIRE)
          return movie;
        }),
          catchError(this.errorService.handleError)
      )
    }
  }
}
