import { MovieService } from './../../services/movie.service';
import { Movie } from 'src/app/shared/models/movie';

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private router: Router, private movieService: MovieService) { }

  ngOnInit(): void {
  }

  @Input() movie?:Movie;

  showMovie() {
    this.router.navigateByUrl(`movie/${this.movie?.id}`)
  }

}
