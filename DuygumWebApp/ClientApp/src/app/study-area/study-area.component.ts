import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ReadTextFileService} from "../services/read-text-file.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-study-area',
  templateUrl: './study-area.component.html',
  styleUrls: ['./study-area.component.css']
})
export class StudyAreaComponent implements AfterViewInit, OnInit {
  paddingTop: string;
  defaultPaddingTop: number = 20;
  yetiskinContents: string = '';
  ergenContents: string = '';
  ciftContents: string = '';
  onlineContents: string = '';
  mobileActive: boolean = false;

  @ViewChild('yetiskin') yetiskin!: ElementRef;
  @ViewChild('ergen') ergen!: ElementRef;
  @ViewChild('cift') cift!: ElementRef;
  @ViewChild('online') online!: ElementRef

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private readTextFileService: ReadTextFileService)
  {
    this.paddingTop = '0px';
  }

  ngOnInit() {

    this.router.events.subscribe((event) => {

      this.cdRef.detectChanges();
      setTimeout(() => {
        if (this.router.url.includes('yetiskin')) {
          this.yetiskin.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
        else if (this.router.url.includes('ergen')) {
          this.ergen.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
        else if (this.router.url.includes('cift')) {
          this.cift.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
        else if (this.router.url.includes('online')) {
          this.online.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
        else {
          window.scrollTo(0,0);
        }
      }, 100); // Adjust the delay as needed


    });

    this.readTextFileService.readFileContents('assets/texts/home/long/yetiskin.txt').then((data) => {
      this.yetiskinContents = data;
    });
    this.readTextFileService.readFileContents('assets/texts/home/long/ergen.txt').then((data) => {
      this.ergenContents = data;
    });
    this.readTextFileService.readFileContents('assets/texts/home/long/cift.txt').then((data) => {
      this.ciftContents = data;
    });
    this.readTextFileService.readFileContents('assets/texts/home/long/online.txt').then((data) => {
      this.onlineContents = data;
    });

    const width = window.innerWidth;
    this.mobileActive = width < 1024;

  }

  ngAfterViewInit() {
    const nav = document.getElementsByTagName('nav')[0];
    const navbarHeight = nav.clientHeight;
    console.log(typeof navbarHeight);
    this.paddingTop = `${navbarHeight + this.defaultPaddingTop}px`;

    this.cdRef.detectChanges();

  }

  private scrollTo(event: string) {
    const element = document.getElementById(event);
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }

  }
}
