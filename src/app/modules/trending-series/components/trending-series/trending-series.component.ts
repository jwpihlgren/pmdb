import { PaginationService } from './../../../../shared/services/pagination.service';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { ITrendingTvShowResult } from 'src/app/shared/models/interfaces/trending-tv-show';
import { TvShowService } from 'src/app/shared/services/tv-show.service';


@Component({
  selector: 'app-trending-series',
  templateUrl: './trending-series.component.html',
  styleUrls: ['./trending-series.component.css']
})
export class TrendingSeriesComponent implements OnInit	 {

  constructor(
    private tvShowService: TvShowService,
    private paginationService: PaginationService
    ) { }

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  trendingTvShows$: Observable<ITrendingTvShowResult> = new Observable();

  ngOnInit(): void {
    this.getTrendingTvShows();
  }

  private getTrendingTvShows(page?: number | undefined): void {
    if(!page) {
      page = this.paginationService.getPageFromUrl();
    }
  
    this.trendingTvShows$ = this.tvShowService.getTrendingTvShows(page);
  }

  requestPage(page: number): void {
    this.paginationService.setPageInUrl(page);
    this.getTrendingTvShows(page);
  }
}