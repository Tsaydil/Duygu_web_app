import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ReadTextFileService} from "../services/read-text-file.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {HttpClient} from '@angular/common/http';
import {getBaseUrl} from "../../main";
import {IContactInfo} from "../Interfaces/ContactInfo";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  paddingTop: string;
  defaultPaddingTop: number = 20;
  currentItem: number = 0;
  aboutContent: string = '';
  yetiskinContents: string = '';
  ergenContents: string = '';
  ciftContents: string = '';
  onlineContents: string = '';
  quotesContents: string[] = [];
  captionsContents: string[] = [];

  mobileActive: boolean = false;

  @ViewChild('contact') contact!: ElementRef;

  @ViewChild('homeVideo') homeVideo!: ElementRef<HTMLVideoElement>;

  @ViewChild('textElement') textElement!: ElementRef;
  @ViewChild('captionElement') captionElement!: ElementRef;
  /*texts: string[] = [
    "Be yourself; everyone else is already taken",
    "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe",
    "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind"
  ];
  captions: string[] = [
    "Oscar Wilde",
    "Marilyn Monroe",
    "Albert Einstein",
    "Bernard M. Baruch"
  ];*/
  currentIndex: number = 0;
  intervalTime: number = 6000; // 3 seconds

  fullName: string = "";
  email: string = "";
  message: string = "";




  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private readTextFileService: ReadTextFileService,
    private resp: BreakpointObserver,
    private http: HttpClient,
    private meta: Meta
  ) {
    this.paddingTop = '0px';
    this.meta.addTags([
      {name: 'description', content: 'Uzman psikolojik danışman Duygu Koyuncu Aydil, yetişkin, ergen, çift ve online terapi alanlarında Konya\'da hizmet vermektedir.'},
      {name: 'keywords', content: 'Konya psikolog, Konya psikolojik danışman, yetişkin terapisi, ergen terapisi, çift terapisi, online terapi'},
      {name: 'author', content: 'Duygu Koyuncu Aydil'}
      ]);
  }

  cycleTexts() {
    setInterval(() => {
      this.fadeOutText(() => {
        this.currentIndex = (this.currentIndex + 1) % this.quotesContents.length;
        //this.textElement.nativeElement.textContent = this.texts[this.currentIndex];
        this.textElement.nativeElement.textContent = this.quotesContents[this.currentIndex];
        this.captionElement.nativeElement.textContent = this.captionsContents[this.currentIndex];
        this.fadeInText();
      });
    }, this.intervalTime);
  }

  fadeOutText(callback: () => void) {
    this.textElement.nativeElement.classList.remove('fade-in');
    this.textElement.nativeElement.classList.add('fade-out');
    this.captionElement.nativeElement.classList.remove('fade-in');
    this.captionElement.nativeElement.classList.add('fade-out');
    setTimeout(() => {
      callback();
    }, 1000); // Match the duration of the fade-out transition
  }

  fadeInText() {
    this.textElement.nativeElement.classList.remove('fade-out');
    this.textElement.nativeElement.classList.add('fade-in');
    this.captionElement.nativeElement.classList.remove('fade-out');
    this.captionElement.nativeElement.classList.add('fade-in');
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(this.router.url.includes('contact')) {
        this.scrollToElement();
      }
      else {
        window.scrollTo(0, 0);
      }

      /*if (!(event instanceof NavigationEnd)) {
        return;
      }*/
      //

    });

    this.readTextFileService.readFileContents('assets/texts/home/quotes.txt').then((data) => {
      this.quotesContents = data.split('\n');
      this.textElement.nativeElement.textContent = this.quotesContents[0];
    });
    this.readTextFileService.readFileContents('assets/texts/home/captions.txt').then((data) => {
      this.captionsContents = data.split('\n');
      this.captionElement.nativeElement.textContent = this.captionsContents[0];
    });

    this.readTextFileService.readFileContents('assets/texts/home/short/yetiskin_short.txt').then((data) => {
      this.yetiskinContents = data;
    });
    this.readTextFileService.readFileContents('assets/texts/home/short/ergen_short.txt').then((data) => {
      this.ergenContents = data;
    });
    this.readTextFileService.readFileContents('assets/texts/home/short/cift_short.txt').then((data) => {
      this.ciftContents = data;
    });
    this.readTextFileService.readFileContents('assets/texts/home/short/online_short.txt').then((data) => {
      this.onlineContents = data;
    });

    this.readTextFileService.readFileContents('assets/texts/about/main_short.txt').then((data) => {
      this.aboutContent = data;
    });


    /*this.resp.observe([
      Breakpoints.Handset
    ]).subscribe(result => {

      this.mobileActive = result.matches;

      //const res = result;
      //console.log("res: ", res);
    });*/

    const width = window.innerWidth;
    this.mobileActive = width < 1024;

  }

  ngAfterViewInit() {

    if (!this.mobileActive) {
      this.setPaddingTop();
    }

    this.textElement.nativeElement.textContent = this.quotesContents[this.currentIndex];
    this.textElement.nativeElement.classList.add('fade-in');

    this.captionElement.nativeElement.textContent = this.captionsContents[this.currentIndex];
    this.captionElement.nativeElement.classList.add('fade-in');

    this.cycleTexts();

    //this.homeVideo.nativeElement.muted = true;
    //this.homeVideo.nativeElement.play();

    this.cdRef.detectChanges();

  }

  private setPaddingTop(): void{
    const nav = document.getElementsByTagName('nav')[0];
    const navbarHeight = nav.clientHeight;
    this.paddingTop = `${navbarHeight}px`;
  }

  sendEmail() {
    /*const fullName = (document.querySelector('input[placeholder="Full Name"]') as HTMLInputElement).value;
    const email = (document.querySelector('input[placeholder="Email"]') as HTMLInputElement).value;
    const message = (document.querySelector('textarea[placeholder="Type a message..."]') as HTMLTextAreaElement).value;*/


    const emailData: IContactInfo = {
      name: this.fullName,
      email: this.email,
      message: this.message
    };



    this.http.post(getBaseUrl() + 'contactform',  emailData)
      .subscribe(response => {
        console.log('Email sent successfully', response);
        this.fullName = "";
        this.email = "";
        this.message = "";
      }, error => {
        console.error('Error sending email', error);
      });
  }

  scrollToElement() {
    this.contact.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }



}
