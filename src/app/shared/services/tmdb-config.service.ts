import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbConfigService {

  SEVENTY_TWO_HOURS_IN_MS = 1000 * 60 * 60 * 72;
  API_MEDIA_TYPE = "/configuration" 

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private localStorageService: LocalStorageService) { }
  private getConfig(){
      this.http.get<any>(`${environment.TMDB_BASE_URL}${this.API_MEDIA_TYPE}?api_key=${environment.TMDB_API_KEY}`).pipe(
        map(config => {
          console.log("I fetched the config")
          this.localStorageService.set("config", config, this.SEVENTY_TWO_HOURS_IN_MS)
          return config
        }),
          catchError(this.errorService.handleError)
      )
    }

    ngOnInit() {
      this.getConfig();
    }


}
