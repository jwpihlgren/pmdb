import { Component, Input, OnInit } from '@angular/core';
import { Season } from 'src/app/shared/models/season';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent implements OnInit {

  constructor() { }

  @Input() content: any;

  ngOnInit(): void {
    console.log(this.content)
  }

}
