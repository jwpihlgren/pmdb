import { catchError, defaultIfEmpty, map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { LocalStorageService } from './local-storage.service';
import { TmdbConfigService } from './tmdb-config.service';
import { environment } from 'src/environments/environment';
import { Size } from 'src/app/shared/models/enums/tmdb/size';
import { ISearchResult, ISearchResultItem } from '../models/interfaces/search-result';
import { PosterService } from './poster.service';

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
    private posterService: PosterService
    ){ }

  
  getAutoComplete(query: string): Observable<ISearchResultItem[]> {
    return this.http.get<any>(`${environment.TMDB_BASE_URL}${this.SEARCH}?api_key=${environment.TMDB_API_KEY}&query=${query}&language=en-US&include_adult=false`, {headers: this.headers})
      .pipe(
        map((data: any) => {
          const filteredResults = this.filterUnique(data);
          const convertedResults = this.convertToSearchResult(filteredResults);
          return convertedResults;
        }),
        catchError(this.errorService.handleError)
      )
  }

  search(query:string, page:number = 1): Observable<ISearchResult> {
    const storedResults: any = this.localStorageService.get(this.STORAGE_NAME);
    if(storedResults && storedResults[query] && storedResults[query][page]) {
      return of(storedResults[query][page]);
    }
    return this.http.get<any>(`${environment.TMDB_BASE_URL}${this.SEARCH}?api_key=${environment.TMDB_API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`, {headers: this.headers})
    .pipe(
      defaultIfEmpty(false),
      map((data:any) => {
        const searchResults: ISearchResultItem[] = this.convertToSearchResult(data.results);
        const resultObject: ISearchResult = {
          currentPage: data.page,
          totalPages: data.total_pages,
          totalResults: data.total_results,
          results: searchResults
        }

        this.writeToLocalStorage(query, resultObject)
        return resultObject;
      }),
      catchError(this.errorService.handleError)
    )
  }

  private writeToLocalStorage(query:string ,resultObject: ISearchResult): void {
    let storedResults = this.localStorageService.get(this.STORAGE_NAME);

    if(!storedResults) {
      storedResults = {}
    }
    const resultToStore: any = {};
    resultToStore[resultObject.currentPage] = resultObject;
    storedResults[query] = {...storedResults[query], ...resultToStore};

    this.localStorageService.set(this.STORAGE_NAME, storedResults, this.MS_UNTIL_EXPIRE)
  }

  private convertToSearchResult(data:any): ISearchResultItem[] {
    const searchResults: ISearchResultItem[] = []
    data.forEach((result: any) => {
      searchResults.push(
        {
          posterPath: this.posterService.setPosterPath(result.poster_path),
          name: result.name || result.title,
          date: result.release_date || result.first_air_date || result.birthday,
          mediaType: result.media_type,
          id: result.id
        }
      )
    })
    return searchResults
  }

  private filterUnique(data: any): any {
    console.log(data);
    if(!data || !data.results) return []
    const results: any = [];
    data.results.forEach((result:any) => {
      const name = result.title || result.name
      const existingNames = results.map((entity: any) => {
        return entity.name || entity.title
      })
      if(!existingNames.includes(name)) {
        results.push(result)
      }
    })

    return results;
  }
  
}
