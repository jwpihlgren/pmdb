import { catchError, defaultIfEmpty, filter, map, Observable, of } from 'rxjs';
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
  posterSize = this.tmdbConfigService.getPoster(Size.XXL);
  profileSize = this.tmdbConfigService.getPoster(Size.MD);
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(    
    private http: HttpClient, 
    private errorService:ErrorService,
    private localStorageService: LocalStorageService,
    private tmdbConfigService:TmdbConfigService,
    ){ }

  search(query:string, page:number = 1): Observable<any[]> {
    const storedResults: any = this.localStorageService.get(this.STORAGE_NAME);
    if(storedResults && storedResults[query]) {
      console.log("The previous search was stored")
      return of(storedResults[query])
    }
    return this.http.get<any>(`${environment.TMDB_BASE_URL}${this.SEARCH}?api_key=${environment.TMDB_API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`, {headers: this.headers})
    .pipe(
      defaultIfEmpty(false),
      map(data=> {
        /* const filteredResponse = this.filterResponse(data); */
        const storedResults = this.localStorageService.get(this.STORAGE_NAME);
        console.log(data)
        if (storedResults) {
          console.log("There was a previous store and I added to it")
          storedResults[query] = data;
          this.localStorageService.set(this.STORAGE_NAME, storedResults, this.MS_UNTIL_EXPIRE);
        }
        else {
          console.log("There wasn't a precious store so I created one and added to it");
          const newStoredResults: any = {};
          newStoredResults[query] = data;
          this.localStorageService.set(this.STORAGE_NAME, newStoredResults, this.MS_UNTIL_EXPIRE);
        }
        
        return data;
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
