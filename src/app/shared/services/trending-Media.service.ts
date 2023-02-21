import { ErrorService } from './error.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';  
import { Media, TrendingMediaResponse } from 'src/app/shared/models/media';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrendingMediaService {
  constructor(
    private http: HttpClient, 
    private errorService:ErrorService,
    private localStorageService: LocalStorageService) { }

  MS_UNTIL_EXPIRE = 1000 *  60 * 60 * 8;   /* Currently 8 hours */
  posterBaseUrl = 'https://image.tmdb.org/t/p/w500/'
  headers = new HttpHeaders({'Content-Type': 'application/json'});

    
  getTrendingMovies(page: number = 1): Observable<TrendingMediaResponse> {
    const storedMovies: TrendingMediaResponse = this.localStorageService.get(`trendingMovies_Page${page}`);
    if(storedMovies && storedMovies.page === page) {
      return of(storedMovies)
    }
    else {
    return this.http.get<any[]>(`${environment.TMDB_BASE_URL}/trending/movie/week?api_key=${environment.TMDB_API_KEY}&page=${page}`, {headers: this.headers})
      .pipe(
        map((response: any) => {
          const movies: Media[] = this.extractDataToMediaType(response)
          const trendingMediaResponse: TrendingMediaResponse = {
            results: movies,
            page: response.page,
            totalResults: response.total_results,
            totalPages: response.total_pages
          }
          
          this.localStorageService.set(`trendingMovies_Page${page}`, trendingMediaResponse, this.MS_UNTIL_EXPIRE)
          return trendingMediaResponse;

        }), catchError(this.errorService.handleError)
      )
    }
  }

  getTrendingSeries(page: number = 1): Observable<TrendingMediaResponse> {
    const storedSeries: TrendingMediaResponse = this.localStorageService.get(`trendingSeries_Page${page}`);
    if(storedSeries && storedSeries.page === page) {
      return of(storedSeries)
    }
    else {
    return this.http.get<any[]>(`${environment.TMDB_BASE_URL}/trending/tv/week?api_key=${environment.TMDB_API_KEY}&page=${page}`, {headers: this.headers})
      .pipe(
        map((response: any) => {
          const series: Media[] = this.extractDataToMediaType(response)
          const TrendingMediaResponse: TrendingMediaResponse = {
            results: series,
            page: response.page,
            totalResults: response.total_results,
            totalPages: response.total_pages
          }
          
          this.localStorageService.set(`trendingSeries_Page${page}`, TrendingMediaResponse, this.MS_UNTIL_EXPIRE)
          return TrendingMediaResponse;

        }), catchError(this.errorService.handleError)
      )
    }
  }

  private extractDataToMediaType(response: any): Media[] {
    const mediaArr: Media[] = []
    response.results.forEach((occurance: any) => {
        mediaArr.push({
          posterPath: `${this.posterBaseUrl}${occurance.poster_path}`,
          title: occurance.title || occurance.name,
          synopsis: occurance.overview,
          id: occurance.id,
          date: occurance.release_date || occurance.first_air_date,
          genreIds: occurance.genre_ids,
          popularity: occurance.popularity,
          voteCount: occurance.vote_count,
          video: occurance.video,
          voteAverage: occurance.vote_average,
          mediaType: occurance.media_type
      })
    })
    return mediaArr
  }
}
