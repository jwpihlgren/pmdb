import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  @Input() resultsObject: any;

  @Output() hinderMouseDownRequest: EventEmitter<Event> = new EventEmitter();
  @Output() resultClickRequest: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.resultsObject)
  }

  hinderMouseDown(event: Event): void {
    this.hinderMouseDownRequest.emit(event);
  }

  resultClick(searchResult: any): void {
    this.resultClickRequest.emit(searchResult);
  }

}
