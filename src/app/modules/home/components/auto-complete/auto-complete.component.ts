import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchResult } from 'src/app/shared/models/search-result';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  @Input() resultsObject?: SearchResult[];

  @Output() hinderMouseDownRequest: EventEmitter<Event> = new EventEmitter();
  @Output() resultClickRequest: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  hinderMouseDown(event: Event): void {
    this.hinderMouseDownRequest.emit(event);
  }

  resultClick(searchResult: any): void {
    this.resultClickRequest.emit(searchResult);
  }

}
