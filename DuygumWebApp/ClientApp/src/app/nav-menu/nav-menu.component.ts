import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, AfterViewInit {
  navbarOpen = false;
  width: number = 0;
  mobileActive: boolean = false;

  @ViewChild('trigger') trigger!: ElementRef;
  @ViewChild('full_screen_nav') nav!: ElementRef;
  @ViewChild('backdrop') backdrop!: ElementRef;
  @ViewChild('DuyguAydilLogo', { static: false }) logo!: ElementRef;
  constructor(private resp: BreakpointObserver) {}

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.mobileActive = this.width < 1024;
  }

  ngAfterViewInit() {
    if (1024 <= this.width && this.width < 1440) {
      this.logo.nativeElement.style.height = '2.5rem';
    }

    if (this.mobileActive) {
      this.trigger.nativeElement.addEventListener('click', () => this.nav.nativeElement.classList.add('open-nav'));
      this.backdrop.nativeElement.addEventListener('click', () => this.nav.nativeElement.classList.remove('open-nav'));
    }

  }

  closeMobileNav() {
    this.nav.nativeElement.classList.remove('open-nav');
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }


  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  private setPaddingTop(): void{
    const logo = document.getElementsByClassName('logo')[0]; //getElementsByTagName('nav')[0];
    const navbarHeight = logo.clientHeight;

  }




}
