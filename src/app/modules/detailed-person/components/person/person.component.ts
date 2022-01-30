import { NavigationService } from 'src/app/shared/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person$: Observable<Person> = new Observable();
  buttonText: string = "Back";

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private navigationService: NavigationService
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id ) this.person$ = this.personService.getPerson(+id);
  }

  goBack(event: any): void {
    event.preventDefault()
    this.navigationService.back();
  }

}
