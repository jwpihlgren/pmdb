import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

@Input() slideOptions!: ISlideOptions

  constructor() { }

  ngOnInit(): void {
  }

}

export interface ISlideOptions {
  url: string
  alt?: string
  orderInLine?: number
  slideLength?: number
}
