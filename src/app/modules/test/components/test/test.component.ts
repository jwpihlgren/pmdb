import { Component, OnInit } from '@angular/core';
import { ILightBoxOptions } from 'src/app/shared/components/lightbox/lightbox.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  lightBoxOptions: ILightBoxOptions = {
    showAll: true,
    images: [
      { url: "https://images.unsplash.com/photo-1686285386868-1e0469db5ddf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" },
      { url: "https://images.unsplash.com/photo-1685438531044-ef75606db89d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" },
      { url: "https://images.unsplash.com/photo-1686538199004-b893a314ddb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" },
      { url: "https://images.unsplash.com/photo-1686515265863-14a4ebda172c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" },
      { url: "https://plus.unsplash.com/premium_photo-1669223464729-437d1d2b5287?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
