import { ResultObject } from './../models/result-object';
import { SearchResult } from 'src/app/shared/models/search-result';
import { catchError, defaultIfEmpty, map, Observable, of } from 'rxjs';
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

  STORAGE_NAME: string = "searchResults";
  MS_UNTIL_EXPIRE = 1000 * 60 * 60 * 8;
  SEARCH = "search/multi"
  APPEND_URL = '&append_to_response=videos,credits';

  imgBaseUrl = this.tmdbConfigService.getConfig().images.secure_base_url;
  posterSize = this.tmdbConfigService.getPoster(Size.MD);
  profileSize = this.tmdbConfigService.getPoster(Size.MD);
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(    
    private http: HttpClient, 
    private errorService:ErrorService,
    private localStorageService: LocalStorageService,
    private tmdbConfigService:TmdbConfigService,
    ){ }

  search(query:string, page:number = 1): Observable<ResultObject> {
    const storedResults: any = this.localStorageService.get(this.STORAGE_NAME);
    if(storedResults && storedResults[query]) {
      return of(storedResults[query])
    }
    return this.http.get<any>(`${environment.TMDB_BASE_URL}${this.SEARCH}?api_key=${environment.TMDB_API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`, {headers: this.headers})
    .pipe(
      defaultIfEmpty(false),
      map((data:any) => {
        const searchResults: SearchResult[] = []
        data.results.forEach((result: any) => {
          searchResults.push(
            {
              poster: result.poster_path || result.profile_path ? `${this.imgBaseUrl}${this.posterSize}/${result.poster_path || result.profile_path}` : 'assets/images/poster_placeholder.png',
              name: result.name || result.title,
              date: result.release_date || result.first_air_date || result.birthday,
              mediaType: result.media_type,
              id: result.id
            }
          )
        })
        data.results = searchResults;
        console.log(data.results)
        const storedResults = this.localStorageService.get(this.STORAGE_NAME);
        if (storedResults) {
          storedResults[query] = data;
          this.localStorageService.set(this.STORAGE_NAME, storedResults, this.MS_UNTIL_EXPIRE);
        }
        else {
          const newStoredResults: any = {};
          newStoredResults[query] = data;
          this.localStorageService.set(this.STORAGE_NAME, newStoredResults, this.MS_UNTIL_EXPIRE);
        }
        
        return data as ResultObject;
      }),
      catchError(this.errorService.handleError)
    )
  }
}
