import { ErrorService } from './error.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';  
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class TrendingMoviesService {

  constructor(private http: HttpClient, private errorService:ErrorService) { }

  url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=a7c72915d9ca22d06835063429d58c63';
  posterBaseUrl = 'https://image.tmdb.org/t/p/w500/'
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  movies$? : Movie[];
    
  getTrendingMovies(): Observable<Movie[]> {
    if (this.movies$) {
      return of(this.movies$)
    }
    else {

    return this.http.get<any[]>(this.url, {headers: this.headers})
      .pipe(
        map((response: any) => {
          const movies: Movie[] = [];
          response.results.forEach((movie: any) => {
            movies.push({
              poster: `${this.posterBaseUrl}${movie.poster_path}`,
              title: movie.title,
              synopsis: movie.overview,
              id: movie.id,
              releaseDate: movie.release_date,
              genreIds: movie.genre_ids,
              popularity: movie.popularity,
              voteCount: movie.vote_count,
              video: movie.video,
              voteAverage: movie.vote_average

            })
          })
          this.movies$ = movies;
          return movies
        }), catchError(this.errorService.handleError)
      )
    }
  }
}
