import { DetailedMovie } from './../models/detailed-movie';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  url = 'https://api.themoviedb.org/3/movie/634649?api_key=a7c72915d9ca22d06835063429d58c63&append_to_response=videos';
  posterBaseUrl = 'https://image.tmdb.org/t/p/w500/'
  headers = new HttpHeaders({'Content-Type': 'application/json'});
    
  getMovie(id: number): Observable<DetailedMovie> {
    return this.http.get<any>(this.url, {headers: this.headers})
      .pipe(
          catchError(this.errorService.handleError)
      )
  }
}

