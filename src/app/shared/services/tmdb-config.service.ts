import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { Size } from 'src/app/shared/models/size';

@Injectable({
  providedIn: 'root'
})
export class TmdbConfigService {

  MS_UNTIL_EXPIRE = 1000 * 60 * 60 * 72; /*Currently 72 hours */
  API_MEDIA_TYPE = "/configuration" 

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private localStorageService: LocalStorageService) { }

    config: any = null;

    getConfig(): any {
      return this.config
    }


    loadConfig(){
      const config = this.localStorageService.get("config");
      if (config) {
        console.log("Using saved config")
        this.config = config;
        return lastValueFrom(of(config))
      }
      
      else {
        return lastValueFrom(this.http.get<any>(`${environment.TMDB_BASE_URL}${this.API_MEDIA_TYPE}?api_key=${environment.TMDB_API_KEY}`).pipe(
          map(config => {
            console.log("I fetched the config"),
            this.config = config;
            this.localStorageService.set("config", config, this.MS_UNTIL_EXPIRE)
            return config
          }),
            catchError(this.errorService.handleError)
        ))
    }
  }

  getPoster(size: Size): string {
    return this.config.images.poster_sizes[size]
  }

  getProfile(size: Size):string {
    return this.config.images.profile_size[size]
  }

  getSafeImageUrl(): string {
    return this.config.images.secure_base_url
  }

}

