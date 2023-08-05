import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Size } from '../models/enums/tmdb/size';
import { DetailedTvShow } from '../models/interfaces/detailed-tv-show';
import ITvResponseObject from '../models/interfaces/response-objects/detailed-tv';
import { ErrorService } from './error.service';
import { LocalStorageService } from './local-storage.service';
import { TmdbConfigService } from './tmdb-config.service';
import { ISeason } from '../models/interfaces/season';
import { CrewService } from './crew.service';
import { ImageService } from './image.service';
import { ISeasonResponseObject } from '../models/interfaces/response-objects/season';

@Injectable({
  providedIn: 'root'
})
export class DetailedTvShowService {

  MS_UNTIL_EXPIRE = 1000 * 60 * 60 * 8;
  MOVIE = "movie/";
  SERIE = "tv/"   
  APPEND_URL = '&append_to_response=videos,credits';

  imgBaseUrl = this.tmdbConfigService.getConfig().images.secure_base_url;
  posterSize = this.tmdbConfigService.getPoster(Size.XXL);
  profileSize = this.tmdbConfigService.getPoster(Size.MD);
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(
    private http: HttpClient, 
    private errorService: ErrorService, 
    private localStorageService: LocalStorageService,
    private tmdbConfigService:TmdbConfigService,
    private crewService: CrewService,
    private imageService: ImageService,
    ) { }

  getSerie(id:number): Observable<DetailedTvShow> {
    const storedSerie = this.localStorageService.get(`${id}`);
    if(storedSerie) {
      ;
      return of(storedSerie)
    }
    else {
      return this.http.get<ITvResponseObject>(`${environment.TMDB_BASE_URL}${this.SERIE}${id}?api_key=${environment.TMDB_API_KEY}${this.APPEND_URL}`, {headers: this.headers})
      .pipe(
        map(data => {
          const serie: DetailedTvShow = {
            poster_path: this.imageService.setPosterPath(data.poster_path),
            name: data.name,
            synopsis: data.overview,
            id: data.id,
            firstAirDate: data.first_air_date,
            lastAirDate: data.last_air_date,
            popularity: data.popularity,
            voteCount: data.vote_count,
            voteAverage: data.vote_average,
            episodeRuntime: data.episode_run_time,
            genres: data.genres,
            crew: this.crewService.setCrew(data.credits.crew),
            cast: this.crewService.setCast(data.credits.cast),
            videos: data.videos.results,
            numberOfEpisodes: data.number_of_episodes,
            numberOfSeasons: data.number_of_seasons,
            seasons: this.setSeasons(data.seasons),
          }

          serie.cast = serie.cast.sort((a, b) => a.order > b.order ? 1 : -1)
          serie.crew = serie.crew.sort((a, b) => a.job > b.job ? 1 : -1)
          return serie
        }),
        catchError(this.errorService.handleError)
      )

    }
  }

  private setSeasons(seasons: ISeasonResponseObject[]): ISeason[] {
    return seasons.map((season: ISeasonResponseObject) => {
      return {
        id: season.id,
        name: season.name,
        overview: season.overview,
        seasonNumber: season.season_number,
        posterPath: this.imageService.setPosterPath(season.poster_path),
        episodeCount: season.episode_count,
        airDate: season.air_date
      }
    })
  }

}
