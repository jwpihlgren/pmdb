import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PageRequestType } from 'src/app/shared/models/page-request-type';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  FIRST_PAGE: number = 1;

  @Input() currentPage: number = 0;
  @Input() numberOfPages: number = 0;
  @Input() numberOfResults: number = 0;

  @Output() onPageRequest: EventEmitter<number> = new EventEmitter();

  public PRT = PageRequestType;
  
  constructor() { 

  }

  onClick(page: number): void {
    console.log(this.currentPage)
    console.log("click page", page)
    if (page >= 1 && page <= this.numberOfPages) {
      this.onPageRequest.emit(page);
    }
    
  }

}


