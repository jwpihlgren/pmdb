import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyToClipboardService {

  constructor() { }


  copy(text: string): void {
    navigator.clipboard.writeText(text)
  }

  isSupported(): boolean {
    return !!navigator.clipboard;
  }
}
