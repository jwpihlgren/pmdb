import { TrendingMediaService } from 'src/app/shared/services/trending-Media.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from 'src/app/shared/models/media';

@Component({
  selector: 'app-trending-series',
  templateUrl: './trending-series.component.html',
  styleUrls: ['./trending-series.component.css']
})
export class TrendingSeriesComponent implements OnInit {

  constructor(private trendingMoviesService: TrendingMediaService) { }

  series$: Observable<Media[]> = new Observable();

  ngOnInit(): void {
    this.series$ = this.trendingMoviesService.getTrendingSeries();

  }
}