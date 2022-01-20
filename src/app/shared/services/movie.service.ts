import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { Cast } from './../models/cast';
import { DetailedMovie } from './../models/detailed-movie';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ErrorService } from './error.service';



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService, 
    private localStorageService: LocalStorageService) { }

  EIGHT_HOURS_IN_MS = 1000 * 60 * 60 * 8;
  MEDIA_TYPE = "movie/"   
  appendUrl = '&append_to_response=videos,credits';
  posterBaseUrl = 'https://image.tmdb.org/t/p/w500/'
  profileBaseUrl = 'https://image.tmdb.org/t/p/w185/'
  headers = new HttpHeaders({'Content-Type': 'application/json'});

    
  getMovie(id: number): Observable<DetailedMovie> {
    const storedMovie = this.localStorageService.get(`${id}`);
    if(storedMovie) {
      console.log("I had stuff stored!")
      return of(storedMovie)
    }

    return this.http.get<any>(`${environment.TMDB_BASE_URL}${this.MEDIA_TYPE}${id}?api_key=${environment.TMDB_API_KEY}${this.appendUrl}`, {headers: this.headers})
      .pipe(
        map(data => {
          const movie: DetailedMovie = {
            poster: `${this.posterBaseUrl}${data.poster_path}`,
            title: data.title,
            synopsis: data.overview,
            id: data.id,
            releaseDate: data.release_date,
            popularity: data.popularity,
            voteCount: data.vote_count,
            videos: data.videos.results,
            voteAverage: data.vote_average,
            genres: data.genres,
            runtime: data.runtime,
            credits: data.credits.cast.map((person: any) => {
              const castPerson: Cast = {
              name: person.name,
              profilePath: person.profile_path ? `${this.profileBaseUrl}${person.profile_path}` : "assets/images/profile_placeholder.png",
              character: person.character,
              order: person.order
              }
              return castPerson
            })
          }
          console.log("I fetched stuf from the API")
          this.localStorageService.set(`${id}`, movie, this.EIGHT_HOURS_IN_MS)
          return movie;
        }),
          catchError(this.errorService.handleError)
      )
  }
}

