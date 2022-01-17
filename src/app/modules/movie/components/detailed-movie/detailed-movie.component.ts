import { DetailedMovie } from './../../../../shared/models/detailed-movie';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/shared/services/movie.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detailed-movie',
  templateUrl: './detailed-movie.component.html',
  styleUrls: ['./detailed-movie.component.css']
})
export class DetailedMovieComponent implements OnInit {

  constructor(private movieService:MovieService, private route: ActivatedRoute) { }

   movie$?: Observable<DetailedMovie>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log(id)
    if(id) {this.movie$ = this.movieService.getMovie(+id);}
    
  }
}
