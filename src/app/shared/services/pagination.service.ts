import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  getPageFromUrl(): number | undefined {
    console.log(this.activatedRoute.snapshot.queryParams);
    const page = this.activatedRoute.snapshot.queryParams['page'];
    if (!page) return
    return page
  }

  setPageInUrl(page?: number): void {
    if (!page) return
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { page: page + '' },
      }
    )
  }

  observeNavigation(): Observable<any> {
    console.log("hit");
    return this.activatedRoute.queryParams
  }
}
