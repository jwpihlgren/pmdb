import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { ClampTextPipe } from './pipes/clamp-text.pipe';



@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent,
    ClampTextPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
