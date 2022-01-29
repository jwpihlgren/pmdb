import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.css']
})
export class ButtonGroupComponent implements OnInit {

@Input() searchIsDirty: boolean = false;

@Output() showExtendedRequest: EventEmitter<any> = new EventEmitter()
@Output() clearFormRequest: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  showExtended():void {
    this.showExtendedRequest.emit();
  }

  clearForm(): void {
    this.clearFormRequest.emit();
  }



}
