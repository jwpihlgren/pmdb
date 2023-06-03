
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

@Input() content!: ICardOptions
buttonText: string = "Show more"

  showContent(event: any) {
    event.preventDefault();
    this.router.navigateByUrl(`${this.content.stub}/${this.content.id}`)
  }
}

export interface ICardOptions {
  id: number
  stub: string
  title: string
  description: string
  voteAverage: number
  posterPath: string
  year: string,
}