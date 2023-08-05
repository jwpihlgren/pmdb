import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchResultObject, SearchResult } from 'src/app/shared/models/interfaces/search-result-object';

@Component({
  selector: 'app-search-grid',
  templateUrl: './search-grid.component.html',
  styleUrls: ['./search-grid.component.css']
})
export class SearchGridComponent implements OnInit {

  @Input() resultsObject?: SearchResultObject;
  @Output() clickRequest: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  onClickRequest(result: SearchResult) {
    this.clickRequest.emit(result)
  }

}
