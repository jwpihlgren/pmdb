import { ErrorService } from './error.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';  
import { Media } from 'src/app/shared/models/media';
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

  MS_UNTIL_EXPIRE = 1000 * 60 * 60 * 8;   /* Currently 8 hours */
  posterBaseUrl = 'https://image.tmdb.org/t/p/w500/'
  headers = new HttpHeaders({'Content-Type': 'application/json'});

    
  getTrendingMovies(): Observable<Media[]> {
    const storedMovies: Media[] = this.localStorageService.get("trendingMovies");
    if(storedMovies) {
      console.log("I had movies stored!")
      return of(storedMovies)
    }
    else {
    return this.http.get<any[]>(`${environment.TMDB_BASE_URL}/trending/movie/week?api_key=${environment.TMDB_API_KEY}`, {headers: this.headers})
      .pipe(
        map((response: any) => {
          const movies: Media[] = this.extractDataToMediaType(response)
          console.log("I fetched movies from the API")
          this.localStorageService.set("trendingMovies", movies, this.MS_UNTIL_EXPIRE)
          return movies;

        }), catchError(this.errorService.handleError)
      )
    }
  }

  getTrendingSeries(): Observable<Media[]> {
    const storedSeries: Media[] = this.localStorageService.get("trendingSeries");
    if(storedSeries) {
      console.log("I had series stored!")
      return of(storedSeries)
    }
    else {
    return this.http.get<any[]>(`${environment.TMDB_BASE_URL}/trending/tv/week?api_key=${environment.TMDB_API_KEY}`, {headers: this.headers})
      .pipe(
        map((response: any) => {
          const series: Media[] = this.extractDataToMediaType(response)
          console.log("I fetched series from the API")
          this.localStorageService.set("trendingSeries", series, this.MS_UNTIL_EXPIRE)
          return series;

        }), catchError(this.errorService.handleError)
      )
    }
  }

  private extractDataToMediaType(response: any): Media[] {
    const mediaArr: Media[] = []
    response.results.forEach((occurance: any) => {
        mediaArr.push({
          poster: `${this.posterBaseUrl}${occurance.poster_path}`,
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
