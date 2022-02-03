import { TmdbConfigService } from './tmdb-config.service';
import { Episode } from 'src/app/shared/models/episode';
import { DetailedSerie } from 'src/app/shared/models/detailed-serie';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { Cast } from 'src/app/shared/models//cast';
import { DetailedMovie } from 'src/app/shared/models/detailed-movie';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ErrorService } from './error.service';
import { Season } from 'src/app/shared/models/season';
import { Size } from 'src/app/shared/models/size';



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
            posterPath: data.poster_path ? `${this.imgBaseUrl}${this.posterSize}/${data.poster_path}` : "assets/images/poster_placeholder.png",
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
            credits: this.extractCredits(data.credits.cast),
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
      return this.http.get<any>(`${environment.TMDB_BASE_URL}${this.SERIE}${id}?api_key=${environment.TMDB_API_KEY}${this.APPEND_URL}`, {headers: this.headers})
      .pipe(
        map(data => {
          const serie: DetailedSerie = {
            posterPath: data.poster_path ? `${this.imgBaseUrl}${this.posterSize}/${data.poster_path}` : "assets/images/poster_placeholder.png",
            name: data.name,
            synopsis: data.overview,
            id: data.id,
            firstAirDate: data.first_air_date,
            lastAirDate: data.last_air_date,
            lastEpisodeToAir: this.extractEpisode(data.last_episode_to_air),
            nextEpisodeToAir: data.next_episode_to_air ? this.extractEpisode(data.next_episode_to_air) : null,
            popularity: data.popularity,
            voteCount: data.vote_count,
            voteAverage: data.vote_average,
            episodeRuntime: data.episode_run_time,
            genres: data.genres,
            credits: this.extractCredits(data.credits.cast),
            videos: data.videos.results,
            status:data.status,
            numberOfEpisodes: data.number_of_episodes,
            numberOfSeasons: data.number_of_seasons,
            seasons: this.extractSeason(data.seasons)
          }
          return serie
        }),
        catchError(this.errorService.handleError)
      )

    }
  }

  private extractSeason(data: any): Season[] {
    const seasons: Season[] = data.map((season: any) => {
      return {
        airDate: season.air_date,
        episodeCount: season.episode_count,
        id: season.id,
        name: season.name,
        overview: season.overview,
        posterPath:  season.poster_path ? `${this.imgBaseUrl}${this.profileSize}/${season.poster_path}` : "assets/images/poster_placeholder.png" ,
        number: season.season_number
      }
    })
    return seasons
  }

  private extractEpisode(data: any): Episode {  
    const episode: Episode = {
      airDate: data.air_date,
      episodeNumber: data.episodeNumber,
      id: data.id,
      episodeName: data.name,
      episodeSynopsis: data.overview,
      seasonNumber: data.season_number,
      episodePoster: data.still_path ? `${this.imgBaseUrl}${this.profileSize}/${data.still_path}` : "assets/images/poster_placeholder.png",
      episodeVoteAverage: data.vote_average,
      episodeVoteCount: data.vote_count
    }
    return episode
  }

  private extractCredits(data: any): Cast[] {
    const credits: Cast[] = data.map((person: any) => {
      return {
      name: person.name,
      profilePath: person.profile_path ? `${this.imgBaseUrl}${this.profileSize}/${person.profile_path}` : "assets/images/profile_placeholder.png",
      character: person.character,
      order: person.order,
      id: person.id
    }
    })
    return credits;
  }
}

