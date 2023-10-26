import { ButtonComponent } from '../components/button/button.component';
import { CopyToClipboardService } from './../services/copy-to-clipboard.service';
import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCopyToClipboard]'
})
export class CopyToClipboardDirective implements AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private copyToClipboardService: CopyToClipboardService
  ) {}

  ngAfterViewInit(): void {
    const button = this.renderer.createElement('button');
    button.classList.add('button');
    button.setAttribute('data-text', 'copied!');
    
    const text = this.renderer.createElement('i');
    text.classList.add('far', 'fa-copy', 'fa-lg');
    
    this.renderer.appendChild(button, text);
    this.renderer.appendChild(this.elementRef.nativeElement, button);

    this.renderer.listen(button, 'click', (event) => {
      const text = this.elementRef.nativeElement.innerText.replace('Copy', '');;
      console.log(text);
      this.copyToClipboardService.copy(text);

      button.classList.add('copied');
      button.disabled = true;
      setTimeout(() => {
        button.classList.remove('copied');
        button.disabled = false;
      }, 2000)
    });
  }



}
