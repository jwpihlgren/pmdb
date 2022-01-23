
import { Media } from 'src/app/shared/models/media';
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

  @Input() content?: Media
  buttonText: string = "Show more"

  showContent() {
    this.router.navigateByUrl(`${this.content?.mediaType}/${this.content?.id}`)
  }

}
