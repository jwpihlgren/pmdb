import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { ClampTextPipe } from './pipes/clamp-text.pipe';
import { MinutesToHoursPipe } from './pipes/minutes-to-hours.pipe';



@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent,
    ClampTextPipe,
    MinutesToHoursPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    ButtonComponent,
    ClampTextPipe,
    MinutesToHoursPipe
  ]
})
export class SharedModule { }
