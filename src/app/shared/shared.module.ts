import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { ClampTextPipe } from './pipes/clamp-text.pipe';
import { MinutesToHoursPipe } from './pipes/minutes-to-hours.pipe';
import { SafePipe } from './pipes/safe-pipe.pipe';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { PillComponent } from './components/pill/pill.component';
import { DataItemComponent } from './components/data-item/data-item.component';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent,
    ClampTextPipe,
    MinutesToHoursPipe,
    SafePipe,
    VideoPlayerComponent,
    PillComponent,
    DataItemComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CardComponent,
    ButtonComponent,
    VideoPlayerComponent,
    ClampTextPipe,
    MinutesToHoursPipe,
    SafePipe,
    PillComponent,
    DataItemComponent,
    ProfileComponent
  ]
})
export class SharedModule { }
