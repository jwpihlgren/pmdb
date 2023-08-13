import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITrendingTvShowResult } from 'src/app/shared/models/interfaces/trending-tv-show';
import { TvShowService } from 'src/app/shared/services/tv-show.service';


@Component({
  selector: 'app-trending-series',
  templateUrl: './trending-series.component.html',
  styleUrls: ['./trending-series.component.css']
})
export class TrendingSeriesComponent implements OnInit {

  constructor(
    private tvShowService: TvShowService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  trendingTvShows$: Observable<ITrendingTvShowResult> = new Observable();

  ngOnInit(): void {
    this.trendingTvShows$ = this.tvShowService.getTrendingTvShows();

  }

  requestPage(page: number):void {
    this.trendingTvShows$ = this.tvShowService.getTrendingTvShows(page);
    this.updateUrl(page);
  }

  private updateUrl(page: number): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { page: page + '' },
      }
    )
  }
}