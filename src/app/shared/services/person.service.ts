import { Person } from 'src/app/shared/models/person';
import { Observable, of, catchError, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Size } from '../models/size';
import { ErrorService } from './error.service';
import { LocalStorageService } from './local-storage.service';
import { TmdbConfigService } from './tmdb-config.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  STORAGE_NAME: string = "persons";
  MS_UNTIL_EXPIRE = 1000 * 60 * 60 * 8;
  REQUEST_TYPE = "person"
  APPEND_URL = 'append_to_response=combined_credits';

  imgBaseUrl = this.tmdbConfigService.getConfig().images.secure_base_url;
  posterSize = this.tmdbConfigService.getPoster(Size.XXL);
  profileSize = this.tmdbConfigService.getPoster(Size.MD);
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient, 
    private errorService:ErrorService,
    private localStorageService: LocalStorageService,
    private tmdbConfigService:TmdbConfigService) { }

    getPerson(id: number): Observable<Person> {
      const storedPersons = this.localStorageService.get(this.STORAGE_NAME);
      if(storedPersons && storedPersons[id] && storedPersons[id].id === id) {
        return of(storedPersons[id])
      }
      else {
        return this.http.get<any>(`${environment.TMDB_BASE_URL}${this.REQUEST_TYPE}/${id}?api_key=${environment.TMDB_API_KEY}&language=en-US&include_adult=false&${this.APPEND_URL}`, {headers: this.headers})
          .pipe(
            map((data: any)=> {
              const person: Person = {
                profile_path: data.profile_path ? `${this.imgBaseUrl}${this.posterSize}/${data.profile_path}` : "assets/images/poster_placeholder.png",
                birthday: data.birthday,
                deathday: data.deathday,
                id: data.id,
                name: data.name,
                biography: data.biography,
                placeOfBirth: data.place_of_birth,
                starredIn: this.extractStarredMedia(data.combined_credits.cast),
                workedOn: this.extractWorkedMedia(data.combined_credits.crew)
                
              }
              person.starredIn = person.starredIn.sort((a, b) => a.date > b.date ? -1 : 1)
              person.workedOn = person.workedOn.sort((a, b) => a.date > b.date ? -1 : 1)
              const storedPersons = this.localStorageService.get(this.STORAGE_NAME);
              if(storedPersons) {
                storedPersons[id] = person
                this.localStorageService.set(this.STORAGE_NAME, storedPersons, this.MS_UNTIL_EXPIRE)
              }
              else {
                const storedPersons: any = {};
                storedPersons[id] = person;
                this.localStorageService.set(this.STORAGE_NAME, storedPersons, this.MS_UNTIL_EXPIRE)
              }
              return person
            }),
            catchError(this.errorService.handleError)
          )
      }
    }

    private extractStarredMedia(cast: any): any[] {
      const starredIn: any[] = []
      cast.forEach((item: any) => {
        starredIn.push(
            { character: item.character,
              poster_path: item.poster_path ? `${this.imgBaseUrl}${this.posterSize}/${item.poster_path}` : "assets/images/poster_placeholder.png",
              title: item.title || item.name,
              synopsis: item.overview,
              id: item.id,
              genreIds: item.genre_ids,
              popularity: item.popularity,
              voteCount: item.vote_count,
              video: item.video,
              voteAverage: item.vote_average,
              mediaType: item.media_type,
              date: item.release_date || item.first_air_date
            }
          )
      })
      return starredIn;
    }
    private extractWorkedMedia(cast: any): any[] {
      const workedOn: any[] = [];
      cast.forEach((item: any) => {
        workedOn.push(
          { poster_path: item.poster_path ? `${this.imgBaseUrl}${this.posterSize}/${item.poster_path}` : "assets/images/poster_placeholder.png",
            title: item.title || item.name,
            synopsis: item.overview,
            id: item.id,
            genreIds: item.genre_ids,
            popularity: item.popularity,
            voteCount: item.vote_count,
            video: item.video,
            voteAverage: item.vote_average,
            mediaType: item.media_type,
            date: item.release_date || item.first_air_date,
            department: item.department,
            job: item.job
          }
        )
      })
      return workedOn

    }
}

