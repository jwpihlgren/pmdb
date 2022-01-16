import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  movies: Movie[] = [
    {
      poster: '../../../../../assets/images/test.jpg',
      title: 'test',
      synopsis: 'test test test',
      id: '1'
    },
    {
      poster: '../../../../../assets/images/test.jpg',
      title: 'test',
      synopsis: 'test test test',
      id: '1'
    },
    {
      poster: '../../../../../assets/images/test.jpg',
      title: 'test',
      synopsis: 'test test test',
      id: '1'
    },
    {
      poster: '../../../../../assets/images/test.jpg',
      title: 'test',
      synopsis: 'test test test',
      id: '1'
    },
    {
      poster: '../../../../../assets/images/test.jpg',
      title: 'test',
      synopsis: 'test test test',
      id: '1'
    },

  ]

  showMovie() {
    
  }

}
