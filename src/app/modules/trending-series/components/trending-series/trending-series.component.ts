import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrendingTvResponseObject } from 'src/app/shared/models/interfaces/response-objects/trending-tv';
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

  trendingSeries$: Observable<ITrendingTvResponseObject> = new Observable();

  ngOnInit(): void {
    this.trendingSeries$ = this.tvShowService.getTrendingTvShows();

  }

  requestPage(page: number):void {
    this.trendingSeries$  = this.tvShowService.getTrendingTvShows(page);
  }
}