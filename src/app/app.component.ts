import { Router } from '@angular/router';
/* import { LocalStorageService } from './shared/services/local-storage.service'; */
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  links = [
    {
      name: "Home",
      path: "home"
    },
    {
      name: "Movies",
      path: "trending-movies"
    },
    {
      name: "Series",
      path: "trending-series"
    },
    {
      name: "About",
      path: "about"
    },

  ]

  MOBILE_BREAKPOINT = 768;

  title = 'trending-movies-2';
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  collapseMenuOpen = false

  constructor(private router: Router
    ) { };

  onCollapse(event: any):void{
    event.preventDefault();
    this.collapseMenuOpen = !this.collapseMenuOpen;
  }

  onBlur(event:any):void {
    event.preventDefault();
    this.collapseMenuOpen = false;
  }

  onClickLink(link: any):void {
    this.collapseMenuOpen = false;
    this.router.navigateByUrl(`/${link.path}`)
  }

  hinderMouseDown(event:any):void {
    event.preventDefault();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any):void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  

}
