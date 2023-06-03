import { TrendingMediaService } from 'src/app/shared/services/trending-Media.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrendingTvResponseObject } from 'src/app/shared/models/trending-tv-response-object.interface';


@Component({
  selector: 'app-trending-series',
  templateUrl: './trending-series.component.html',
  styleUrls: ['./trending-series.component.css']
})
export class TrendingSeriesComponent implements OnInit {

  constructor(
    private trendingMoviesService: TrendingMediaService,
    ) { }

  trendingSeries$: Observable<ITrendingTvResponseObject> = new Observable();

  ngOnInit(): void {
    this.trendingSeries$ = this.trendingMoviesService.getTrendingSeries();

  }

  requestPage(page: number):void {
    this.trendingSeries$  = this.trendingMoviesService.getTrendingSeries(page);
  }
}