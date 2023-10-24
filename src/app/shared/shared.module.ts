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
import { GridComponent } from './components/grid/grid.component';
import { SmallCardComponent } from './components/small-card/small-card.component';
import { RoundToFullMinutePipe } from './pipes/round-to-full-minute.pipe';
import { CollapseMenuComponent } from './components/collapse-menu/collapse-menu.component';
import { RoundNumbersPipe } from './pipes/round-numbers.pipe';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { SlideComponent } from './components/lightbox/components/slide/slide.component';
import { CopyToClipboardComponent } from './components/copy-to-clipboard/copy-to-clipboard.component';

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
    ProfileComponent,
    GridComponent,
    SmallCardComponent,
    RoundToFullMinutePipe,
    CollapseMenuComponent,
    RoundNumbersPipe,
    PaginatorComponent,
    LightboxComponent,
    SlideComponent,
    CopyToClipboardComponent
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
    ProfileComponent,
    GridComponent,
    SmallCardComponent,
    RoundToFullMinutePipe,
    CollapseMenuComponent,
    PaginatorComponent,
    LightboxComponent,
    CopyToClipboardComponent
  ]
})
export class SharedModule { }
