import { debounceTime, Observable, Subscription, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/shared/services/search.service';
import { __values } from 'tslib';
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
  queryResults$: Observable<any> = new Observable();

  constructor(
    private searchService: SearchService,
    private router: Router
  ) { 
    this.search = new FormControl('');
   this.queryResults$ = this.resetSearch();
   }

  ngOnInit(): void {
  }

  resetForm(): void {
    this.search.setValue('');
    this.search.markAsPristine();
    this.extendedResultsActive=false;
    this.queryResults$ = this.resetSearch();
  }

  onToggleFocus(event: any): void {
    event.preventDefault();
    this.inputIsActive = !this.inputIsActive;
  }

  onClick(media: any): void {
    console.log(media)
    this.resetForm();
    this.router.navigateByUrl(`${media.media_type}/${media.id}`);
  }

  hinderMouseDown(event:any) {
    event.preventDefault();
  }

  requestPage(page: number):void {
    console.log(page)
    this.queryResults$ = this.searchService.search(this.search.value, page);
    

  }

  fullSearch():void {
    this.inputIsActive = false;
  }

  private resetSearch() {
    return this.search.valueChanges.pipe(
      debounceTime(200),
      switchMap(query => this.searchService.search(query))
    )
  }



}