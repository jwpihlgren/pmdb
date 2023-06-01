import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailedPersonRoutingModule } from './detailed-person-routing.module';
import { PersonComponent } from './components/person/person.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PersonComponent
  ],
  imports: [
    CommonModule,
    DetailedPersonRoutingModule,
    SharedModule
  ]
})
export class DetailedPersonModule { }
