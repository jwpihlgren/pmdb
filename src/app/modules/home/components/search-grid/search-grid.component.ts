import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ISearchResult, ISearchResultItem } from 'src/app/shared/models/interfaces/search-result';

@Component({
  selector: 'app-search-grid',
  templateUrl: './search-grid.component.html',
  styleUrls: ['./search-grid.component.css']
})
export class SearchGridComponent implements OnInit {

  @Input() resultsObject?: ISearchResult;
  @Output() clickRequest: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  onClickRequest(result: ISearchResultItem) {
    this.clickRequest.emit(result)
  }

}
