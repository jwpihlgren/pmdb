import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { ClampTextPipe } from './pipes/clamp-text.pipe';
import { MinutesToHoursPipe } from './pipes/minutes-to-hours.pipe';
import { SafePipe } from './pipes/safe-pipe.pipe';
import { VideoPlayerComponent } from './components/video-player/video-player.component';



@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent,
    ClampTextPipe,
    MinutesToHoursPipe,
    SafePipe,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    ButtonComponent,
    VideoPlayerComponent,
    ClampTextPipe,
    MinutesToHoursPipe,
    SafePipe
  ]
})
export class SharedModule { }
