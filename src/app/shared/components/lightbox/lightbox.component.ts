import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent implements OnInit {

  currentSlide: number = 0
  lightBoxOpen: boolean = false

  @Input() lightBoxOptions: ILightBoxOptions = {
    images: [],
    showAll: false
  }

  constructor() { }

  ngOnInit(): void {
  }

  openLightbox(index: any = 0) {
    this.currentSlide = index as number 
    this.lightBoxOpen = true
  }
  
  closeLightbox() {
    this.lightBoxOpen = false
  }

  nextSlide() {
    if (this.currentSlide < this.lightBoxOptions.images.length - 1) return this.currentSlide++
    return this.currentSlide = 0
  }

  previousSlide() {
    if (this.currentSlide > 0) return this.currentSlide--
    return this.currentSlide = this.lightBoxOptions.images.length - 1
  }

}

export interface ILightBoxOptions {
  images: Iimage[]
  showAll?: boolean
}

export interface Iimage {
  url: string
  alt?: string
}
