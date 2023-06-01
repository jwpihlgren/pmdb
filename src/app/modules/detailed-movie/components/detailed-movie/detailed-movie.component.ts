import { NavigationService } from 'src/app/shared/services/navigation.service';
import { DetailedMediaService } from 'src/app/shared/services/detailed-media.service';
import { DetailedMovie } from 'src/app/shared/models/detailed-movie';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detailed-movie',
  templateUrl: './detailed-movie.component.html',
  styleUrls: ['./detailed-movie.component.css']
})
export class DetailedMovieComponent implements OnInit {

  constructor(
    private detailedMediaService: DetailedMediaService, 
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService
    ) { }

  movie$?: Observable<DetailedMovie>;
  buttonText: string = "Back"

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {this.movie$ = this.detailedMediaService.getMovie(+id);}
  }

  goBack(event: any): void {
    event.preventDefault()
    this.navigationService.back();
  }

  onPersonClick(id:number): void {
    this.router.navigateByUrl(`person/${id}`);
  }

  
}
