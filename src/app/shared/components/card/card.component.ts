import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


@Input() movie?:Movie; /* {
  poster: '',
  title: '',
  synopsis: '',
  id: '1'
} */

  showMovie() {
    console.log('Button clicked');
    this.router.navigateByUrl(`movie/${this.movie?.id}`)
    
  }

}
