import { ICast, ICrew } from '../../models/tv-response-object.interface';
import { Component, Input, OnInit} from '@angular/core';

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
