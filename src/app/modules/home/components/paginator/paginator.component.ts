import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PageRequestType } from 'src/app/shared/models/page-request-type';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  FIRST_PAGE: number = 1;

  @Input() currentPage: number = 0;
  @Input() numberOfPages: number = 0;
  @Input() numberOfResults: number = 0;

  previousPage: number = 0;
  nextPage: number = 0;

  @Output() onPageRequest: EventEmitter<number> = new EventEmitter();

  public PRT = PageRequestType;
  
  constructor() { 

  }

  ngOnInit():void {
    this.previousPage =  this.currentPage - 1;
    this.nextPage = this.currentPage + 1;
  }

  onClick(page: number): void {
    if (page >= 1 && page <= this.numberOfPages) {
      this.onPageRequest.emit(page);
    }
    
  }

}


