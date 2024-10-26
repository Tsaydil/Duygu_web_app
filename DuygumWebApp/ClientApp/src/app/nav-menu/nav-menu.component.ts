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

  //trigger = document.querySelector('.trigger');
  //nav = document.querySelector('.full-screen-nav');
  //backdrop = document.querySelector('.backdrop');


  //trigger = document.getElementsByClassName('trigger')[0];
  //nav = document.getElementsByClassName('full-screen-nav')[0];
  //backdrop = document.getElementsByClassName('backdrop')[0];

  @ViewChild('trigger') trigger!: ElementRef;
  @ViewChild('full_screen_nav') nav!: ElementRef;
  @ViewChild('backdrop') backdrop!: ElementRef;
  @ViewChild('DuyguAydilLogo', { static: false }) logo!: ElementRef;





  constructor(private resp: BreakpointObserver) {}

  ngOnInit(): void {

    /*this.resp.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
    ]).subscribe(result => {

      this.mobileActive = result.matches;

      //const res = result;
      //console.log("res: ", res);

    });*/

    this.width = window.innerWidth;
    this.mobileActive = this.width < 1024;

  }

  ngAfterViewInit() {
    //this.trigger.addEventListener('click', () => this.nav.classList.add('open-nav'));
    //this.backdrop.addEventListener('click', () => this.nav.classList.remove('open-nav'));

    if (1024 <= this.width && this.width < 1440) {
      this.logo.nativeElement.style.height = '2.5rem';
    }

    //this.logo.nativeElement.style.height = '4rem';

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
