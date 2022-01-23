import { DetailedMediaService } from 'src/app/shared/services/detailed-media.service';
import { DetailedMovie } from 'src/app/shared/models/detailed-movie';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailed-movie',
  templateUrl: './detailed-movie.component.html',
  styleUrls: ['./detailed-movie.component.css']
})
export class DetailedMovieComponent implements OnInit {

  constructor(
    private detailedMediaService: DetailedMediaService, 
    private route: ActivatedRoute,) { }

   movie$?: Observable<DetailedMovie>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {this.movie$ = this.detailedMediaService.getMovie(+id);}
  }
}
