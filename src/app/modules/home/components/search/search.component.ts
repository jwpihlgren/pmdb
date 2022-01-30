import { ResultObject } from 'src/app/shared/models/result-object';
import { SearchGridComponent } from './../search-grid/search-grid.component';import { debounceTime, Observable, Subscription, switchMap } from 'rxjs';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/shared/services/search.service';
import { Router } from '@angular/router';

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
  queryResults$: Observable<ResultObject> = new Observable();

  constructor(
    private searchService: SearchService,
    private router: Router,
    private elementRef: ElementRef) { 
      this.search = new FormControl('');
      this.queryResults$ = this.resetSearch();
    }

  ngOnInit(): void {
  }

  clearForm(): void {
    this.search.setValue('');
    this.search.markAsPristine();
    this.queryResults$ = this.resetSearch();
  }

  onToggleFocus(event: any): void {
    event.preventDefault();
    this.inputIsActive = !this.inputIsActive;
    this.extendedResultsActive = false;
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
  }

  private resetSearch(): Observable<any> {
    return this.search.valueChanges.pipe(
      debounceTime(200),
      switchMap(query => {
        if(query !== '') {
         return this.searchService.search(query)
        }
        return new Observable<any>()
        
      } )
    )
  }



}
