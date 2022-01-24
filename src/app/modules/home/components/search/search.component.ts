import { debounceTime, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/shared/services/search.service';
import { __values } from 'tslib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy{

  search: FormControl;
  subscriptions: Subscription[] = [];
  searchIsActive: boolean = false;
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


 ngOnDestroy(): void {
   this.subscriptions.forEach(subscription => {
     subscription.unsubscribe();
   })
 }

  resetForm(): void {
    this.search.setValue('');
    this.search.markAsPristine();
    this.queryResults$ = this.resetSearch();
  }

  onToggleFocus(event: any): void {
    event.preventDefault();
    this.searchIsActive = !this.searchIsActive;
  }

  onClick(media: any): void {
    this.resetForm();
    this.router.navigateByUrl(`${media.media_type}/${media.id}`);
  }

  hinderMouseDown(event:any) {
    event.preventDefault();
  }


  private resetSearch() {
    return this.search.valueChanges.pipe(
      debounceTime(200),
      switchMap(query => this.searchService.search(query))
    )
  }



}
