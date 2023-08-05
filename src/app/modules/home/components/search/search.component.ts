import { debounceTime, Observable, Subscription, switchMap } from 'rxjs';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/shared/services/search.service';
import { Router } from '@angular/router';
import { SearchResult, SearchResultObject } from 'src/app/shared/models/interfaces/search-result-object';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  search: FormControl;
  subscriptions: Subscription[] = [];
  inputIsActive: boolean = false;
  extendedResultsActive: boolean = false;
  queryResults$: Observable<SearchResultObject> = new Observable();
  autoCompleteResults$: Observable<SearchResult[]> = new Observable();

  constructor(
    private searchService: SearchService,
    private router: Router,
    private elementRef: ElementRef) { 
      this.search = new FormControl('');
      this.autoCompleteResults$ = this.resetSearch();
      this.queryResults$;
    }

  ngOnInit(): void {
  }

  clearForm(): void {
    this.search.setValue('');
    this.search.markAsPristine();
    this.autoCompleteResults$ = this.resetSearch();
    this.queryResults$ = new Observable();
  }

  onToggleFocus(event: any): void {
    event.preventDefault();
    this.inputIsActive = !this.inputIsActive;
    this.extendedResultsActive = false;
  }

  onSuggestionClick(media:any): void {
    this.search.setValue(media.name)
    this.showExtended();

  }

  onResultClick(media: any): void {
    this.clearForm();
    this.router.navigateByUrl(`${media.mediaType}/${media.id}`);
  }

  hinderMouseDown(event:any) {
    event.preventDefault();
  }

  requestPage(page: number):void {
    this.queryResults$ = this.searchService.search(this.search.value, page);
  }

  showExtended() :void {
    this.elementRef.nativeElement.focus();
    this.extendedResultsActive = true;
    this.requestPage(1);
  }

  private resetSearch(): Observable<any> {
    return this.search.valueChanges.pipe(
      debounceTime(200),
      switchMap(query => {
        if(query !== '') {
         return this.searchService.getAutoComplete(query)
        }
        return new Observable<any>()
        
      } )
    )
  }



}
