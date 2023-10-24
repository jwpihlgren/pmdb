import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CopyToClipboardService } from '../../services/copy-to-clipboard.service';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.css']
})
export class CopyToClipboardComponent implements OnInit, AfterViewInit {

  constructor(
    private elt:ElementRef, 
    private copyToClipboardService: CopyToClipboardService) { }

  copyToClipboardIsSupported!: boolean
  isCopied: boolean = false
  content!: string

  ngOnInit(): void {
    this.copyToClipboardIsSupported = this.copyToClipboardService.isSupported();
  }

  ngAfterViewInit(): void {
    this.content = this.elt.nativeElement.childNodes[0].innerText
  }

  copy(): void {
    if (!this.copyToClipboardIsSupported) return;
    if (this.isCopied) return;
    this.copyToClipboardService.copy(this.content);
    this.isCopied = true;
    setTimeout(() => this.isCopied = false, 2000)
  }

}
