import { SearchResult } from 'src/app/shared/models/search-result';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ResultObject } from 'src/app/shared/models/result-object';

@Component({
  selector: 'app-search-grid',
  templateUrl: './search-grid.component.html',
  styleUrls: ['./search-grid.component.css']
})
export class SearchGridComponent implements OnInit {

  @Input() resultsObject?: ResultObject;
  @Output() clickRequest: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  onClickRequest(result: SearchResult) {
    this.clickRequest.emit(result)
  }

}
