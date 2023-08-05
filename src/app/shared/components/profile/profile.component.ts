import { Component, Input, OnInit} from '@angular/core';
import { ICast } from '../../models/interfaces/cast';
import { ICrew } from '../../models/interfaces/crew';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() castPerson? : ICast 
  @Input() crewPerson? : ICrew

}
