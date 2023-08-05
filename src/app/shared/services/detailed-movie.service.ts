import { TmdbConfigService } from './tmdb-config.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ErrorService } from './error.service';
import { Size } from '../models/enums/tmdb/size';
import { DetailedMovie } from '../models/interfaces/detailed-movie';
import { IDetailedMovieResponseObject } from '../models/interfaces/response-objects/detailed-movie';
import { CrewService } from './crew.service';
import { ImageService } from './image.service';


@Injectable({
  providedIn: 'root'
})
export class DetailedMovieService {

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService, 
    private localStorageService: LocalStorageService,
    private tmdbConfigService:TmdbConfigService,
    private crewService: CrewService,
    private imageService: ImageService,
    ) { }

  MS_UNTIL_EXPIRE = 1000 * 60 * 60 * 8;
  MOVIE = "movie/";
  SERIE = "tv/"   
  APPEND_URL = '&append_to_response=videos,credits';

  imgBaseUrl = this.tmdbConfigService.getConfig().images.secure_base_url;
  posterSize = this.tmdbConfigService.getPoster(Size.XXL);
  profileSize = this.tmdbConfigService.getPoster(Size.MD);
  headers = new HttpHeaders({'Content-Type': 'application/json'});

    
  getMovie(id: number): Observable<DetailedMovie> {
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

