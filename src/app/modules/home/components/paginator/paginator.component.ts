import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PageRequestType } from 'src/app/shared/models/page-request-type';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  @Input() currentPage: number = 0;
  @Input() numberOfPages: number = 0;
  @Input() numberOfResults: number = 0;

  @Output() onPageRequest: EventEmitter<PageRequestType> = new EventEmitter();
  @Output() onPageNumberRequest: EventEmitter<number> = new EventEmitter();

  public PRT = PageRequestType;
  
  constructor() { 

  }

  onClick(pageRequestType: PageRequestType): void {
    this.onPageRequest.emit(pageRequestType)
  }

  onClickPage(pageNumber: number) {
    this.onPageNumberRequest.emit(pageNumber)
  }



}


