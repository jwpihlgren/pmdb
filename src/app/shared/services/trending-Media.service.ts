import { ErrorService } from './error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';  
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';
import { ITrendingMovieResponseObject } from '../models/trending-movie-response-object.interface';
import { ITrendingTvResponseObject } from '../models/trending-tv-response-object.interface';


@Injectable({
  providedIn: 'root'
})
export class TrendingMediaService {

  MS_UNTIL_EXPIRE = 1000 *  60 * 60 * 8;   /* Currently 8 hours */
  posterBaseUrl = 'https://image.tmdb.org/t/p/w500/'
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient, 
    private errorService:ErrorService,
    private localStorageService: LocalStorageService) { }
    
  getTrendingMovies(page: number = 1): Observable<ITrendingMovieResponseObject> {
    const storedMovies: ITrendingMovieResponseObject = this.localStorageService.get(`trendingMovies_Page${page}`);
    if(storedMovies && storedMovies.page === page) {
      return of(storedMovies)
    }
    else {
    return this.http.get<ITrendingMovieResponseObject>(`${environment.TMDB_BASE_URL}/trending/movie/week?api_key=${environment.TMDB_API_KEY}&page=${page}`, {headers: this.headers})
      .pipe(
        map((response) => {        
          response.results.forEach((movie) => {
            movie.poster_path = `${this.posterBaseUrl}${movie.poster_path}`
          })  
          this.localStorageService.set(`trendingMovies_Page${page}`, response, this.MS_UNTIL_EXPIRE)
          return response;

        }), catchError(this.errorService.handleError)
      )
    }
  }

  getTrendingSeries(page: number = 1): Observable<ITrendingTvResponseObject> {
    const storedSeries: ITrendingTvResponseObject = this.localStorageService.get(`trendingSeries_Page${page}`);
    if(storedSeries && storedSeries.page === page) {
      return of(storedSeries)
    }
    else {
    return this.http.get<ITrendingTvResponseObject>(`${environment.TMDB_BASE_URL}/trending/tv/week?api_key=${environment.TMDB_API_KEY}&page=${page}`, {headers: this.headers})
      .pipe(
        map((response) => {
          response.results.forEach((serie) => {
            serie.poster_path = `${this.posterBaseUrl}${serie.poster_path}`
          })
          this.localStorageService.set(`trendingSeries_Page${page}`, response, this.MS_UNTIL_EXPIRE)
          return response;

        }), catchError(this.errorService.handleError)
      )
    }
  }
}
