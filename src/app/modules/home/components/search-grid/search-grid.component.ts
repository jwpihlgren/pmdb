import { TmdbConfigService } from 'src/app/shared/services/tmdb-config.service';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Size } from 'src/app/shared/models/size';

@Component({
  selector: 'app-search-grid',
  templateUrl: './search-grid.component.html',
  styleUrls: ['./search-grid.component.css']
})
export class SearchGridComponent implements OnInit {

  @Input() resultsObject: any;
  @Output() clickRequest: EventEmitter<any> = new EventEmitter();


  constructor(private tmdbConfigService: TmdbConfigService) { }


  ngOnInit(): void {
    console.log(this.resultsObject)
  }

  secureUrl(path:string): string {
    return `${this.tmdbConfigService.getSafeImageUrl()}/${this.tmdbConfigService.getPoster(Size.XS)}/${path}`
  }

  onClickRequest(result: any) {
    console.log("li click")
    this.clickRequest.emit(result)
  }

}
