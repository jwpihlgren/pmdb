import { Component, OnInit } from '@angular/core';
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
    ) { }

  trendingTvShows$: Observable<ITrendingTvShowResult> = new Observable();

  ngOnInit(): void {
    this.trendingTvShows$ = this.tvShowService.getTrendingTvShows();

  }

  requestPage(page: number):void {
    this.trendingTvShows$  = this.tvShowService.getTrendingTvShows(page);
  }
}