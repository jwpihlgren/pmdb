import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player-component',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {

  constructor(private sanitizer: DomSanitizer) { }
  @Input() videoId?: string;
  unsafeUrl?: string;

  getSafeUrl(id: string): SafeValue {
    this.unsafeUrl = "https://www.youtube-nocookie.com/embed/" + id
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.unsafeUrl)
  }
}
