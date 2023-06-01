import { TmdbConfigService } from './tmdb-config.service';
import { DetailedSerie } from 'src/app/shared/models/detailed-serie';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { Cast } from 'src/app/shared/models//cast';
import { DetailedMovie } from 'src/app/shared/models/detailed-movie';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ErrorService } from './error.service';
import { Size } from 'src/app/shared/models/size';
import ITvResponseObject, { IAppendedCredits, ICast, ICredit, ICrew, IEpisode, ISeason, IVideo } from '../models/tv-response-object.interface';



@Injectable({
  providedIn: 'root'
})
export class DetailedMediaService {

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService, 
    private localStorageService: LocalStorageService,
    private tmdbConfigService:TmdbConfigService,
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
      return this.http.get<any>(`${environment.TMDB_BASE_URL}${this.MOVIE}${id}?api_key=${environment.TMDB_API_KEY}${this.APPEND_URL}`, {headers: this.headers})
      .pipe(
        map(data => {
          const movie: DetailedMovie = {
            poster_path: this.setposter_path(data.poster_path),
            title: data.title,
            synopsis: data.overview,
            id: data.id,
            releaseDate: data.release_date,
            popularity: data.popularity,
            voteCount: data.vote_count,
            voteAverage: data.vote_average,
            genres: data.genres,
            runtime: data.runtime,
            cast: this.setCreditsposter_path(data.credits.cast) as ICast[],
            crew: this.setCreditsposter_path(data.credits.crew) as ICrew[],
            videos: data.videos.results,
          }
          
          this.localStorageService.set(`${id}`, movie, this.MS_UNTIL_EXPIRE)
          return movie;
        }),
          catchError(this.errorService.handleError)
      )
    }
  }

  getSerie(id:number): Observable<DetailedSerie> {
    const storedSerie = this.localStorageService.get(`${id}`);
    if(storedSerie) {
      ;
      return of(storedSerie)
    }
    else {
      return this.http.get<ITvResponseObject>(`${environment.TMDB_BASE_URL}${this.SERIE}${id}?api_key=${environment.TMDB_API_KEY}${this.APPEND_URL}`, {headers: this.headers})
      .pipe(
        map(data => {
          const serie: DetailedSerie = {
            poster_path: this.setposter_path(data.poster_path),
            name: data.name,
            synopsis: data.overview,
            id: data.id,
            firstAirDate: data.first_air_date,
            lastAirDate: data.last_air_date,
            lastEpisodeToAir: this.setEpisodeposter_path(data.last_episode_to_air),
            nextEpisodeToAir: data.next_episode_to_air,
            popularity: data.popularity,
            voteCount: data.vote_count,
            voteAverage: data.vote_average,
            episodeRuntime: data.episode_run_time,
            genres: data.genres,
            crew: this.setCreditsposter_path(data.credits.crew) as ICrew[],
            cast: this.setCreditsposter_path(data.credits.cast) as ICast[],
            videos: data.videos.results,
            numberOfEpisodes: data.number_of_episodes,
            numberOfSeasons: data.number_of_seasons,
            seasons: this.setSeasonposter_path(data.seasons)
          }
          return serie
        }),
        catchError(this.errorService.handleError)
      )

    }
  }

  private setposter_path(path: string): string {
    return path ? `${this.imgBaseUrl}${this.posterSize}/${path}` : "assets/images/poster_placeholder.png"
  }


  private setSeasonposter_path(data: ISeason[]): ISeason[] {
    data.forEach((season: ISeason) => {
      if(!season.poster_path) season["poster_path"] = "assets/images/poster_placeholder.png"
      else season.poster_path = season.poster_path ? `${this.imgBaseUrl}${this.profileSize}/${season.poster_path}` : "assets/images/poster_placeholder.png"
    })
    return data
  }

  private setEpisodeposter_path(data: IEpisode): IEpisode {
    if (!data) return data
    if(!data.still_path) data["still_path"] = "assets/images/poster_placeholder.png"
    data.still_path = data.still_path ? `${this.imgBaseUrl}${this.profileSize}/${data.still_path}` : "assets/images/poster_placeholder.png"
    return data
  }

  private setCreditsposter_path(data: ICast[] | ICrew[]): ICast[] | ICrew[] {
    data.forEach((credit: ICast | ICrew) => {
      if(!credit.profile_path) credit["profile_path"] = "assets/images/poster_placeholder.png"
      else credit.profile_path = credit.profile_path ? `${this.imgBaseUrl}${this.profileSize}/${credit.profile_path}` : "assets/images/profile_placeholder.png"
    })

    return data
  }

}

