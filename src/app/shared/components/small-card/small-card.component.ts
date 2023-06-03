import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  @Input() content: any;

  ngOnInit(): void {
  }

  showContent(event: any) {
    event.preventDefault();
    this.router.navigateByUrl(`${this.content?.mediaType}/${this.content?.id}`)
  }

  getRoute(): string {
    return `${this.content?.mediaType}/${this.content?.id}`
  }

}
