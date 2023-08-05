import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISmallCardConfig } from '../../models/interfaces/small-card-config';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  @Input() config!: ISmallCardConfig;

  ngOnInit(): void {
  }

  showContent(event: any) {
    event.preventDefault();
    if(this.config.href) {
      this.router.navigateByUrl(this.config.href)
    }
    
  }
}