import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-grid',
  templateUrl: './search-grid.component.html',
  styleUrls: ['./search-grid.component.css']
})
export class SearchGridComponent implements OnInit {

  @Input() queryResults: any[] = [];

  constructor() { }

 

  ngOnInit(): void {
  }

}
