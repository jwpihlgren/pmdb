import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-collapse-menu',
  templateUrl: './collapse-menu.component.html',
  styleUrls: ['./collapse-menu.component.css']
})
export class CollapseMenuComponent implements OnInit {

  collapseMenuOpen = false
  @Input() linkList: any[] = [];
  @Output() onClickRequest: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onCollapse(event: any):void{
    event.preventDefault();
    this.collapseMenuOpen = !this.collapseMenuOpen;
  }

  onBlur(event:any):void {
    event.preventDefault();
    this.collapseMenuOpen = false;
  }

  onClickLink(link: any):void {
    this.collapseMenuOpen = false;
    this.onClickRequest.emit(link)
    /* this.router.navigateByUrl(`/${link.path}`) */
  }

  hinderMouseDown(event:any):void {
    event.preventDefault();
  }

}
