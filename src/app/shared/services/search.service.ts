import { catchError, defaultIfEmpty, filter, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { LocalStorageService } from './local-storage.service';
import { TmdbConfigService } from './tmdb-config.service';
import { environment } from 'src/environments/environment';
import { Size } from 'src/app/shared/models/size';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(    
    private http: HttpClient, 
    private errorService:ErrorService,
    private localStorageService: LocalStorageService,
    private tmdbConfigService:TmdbConfigService,
    ){ }

    MS_UNTIL_EXPIRE = 1000 * 60 * 60 * 8;
    SEARCH = "search/multi"
    APPEND_URL = '&append_to_response=videos,credits';
  
    imgBaseUrl = this.tmdbConfigService.getConfig().images.secure_base_url;
    posterSize = this.tmdbConfigService.getPoster(Size.XXL);
    profileSize = this.tmdbConfigService.getPoster(Size.MD);
    headers = new HttpHeaders({'Content-Type': 'application/json'});

  search(query:string, page:number = 1): Observable<any[]> {
    return this.http.get<any>(`${environment.TMDB_BASE_URL}${this.SEARCH}?api_key=${environment.TMDB_API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`, {headers: this.headers})
    .pipe(
      defaultIfEmpty(false),
      map(data=> {
        const filteredResponse = this.filterResponse(data);
        return filteredResponse;
      }),
      catchError(this.errorService.handleError)
    )
  }

  private filterResponse(data: any): any {
    const filteredResults = data.results.filter((result: any) => {
      return result.media_type !== "person"
    })
    data.results = filteredResults
    return data;
  }
}
