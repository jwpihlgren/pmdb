import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() text:string = '';
  
  @Output() onClickRequest = new EventEmitter<Event>();

  onClick(event: Event) {
    this.onClickRequest.emit(event)
  }

}
