import { NavigationService } from 'src/app/shared/services/navigation.service';
import { DetailedSerie } from 'src/app/shared/models/detailed-serie';
import { Component, OnInit } from '@angular/core';
import { DetailedMediaService } from 'src/app/shared/services/detailed-media.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detailed-series',
  templateUrl: './detailed-series.component.html',
  styleUrls: ['./detailed-series.component.css']
})
export class DetailedSeriesComponent implements OnInit {

  constructor(
    private detailedMediaService: DetailedMediaService,
    private route: ActivatedRoute,
    private navigationService: NavigationService
    ) { }
  
  serie$?: Observable<DetailedSerie>;
  buttonText: string = "Back";
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) this.serie$ = this.detailedMediaService.getSerie(+id)
    
  }

  goBack(event: any): void {
    event.preventDefault()
    this.navigationService.back();
  }

}
