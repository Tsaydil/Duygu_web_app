import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  paddingTop: string;
  defaultPaddingTop: number = 20;

  currentItem: number = 0;

  @ViewChild('textElement') textElement!: ElementRef;
  @ViewChild('captionElement') captionElement!: ElementRef;
  texts: string[] = [
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
  ];
  currentIndex: number = 0;
  intervalTime: number = 6000; // 3 seconds






  constructor(private router: Router) {
    this.paddingTop = '0px';
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      /*if (!(event instanceof NavigationEnd)) {
        return;
      }*/
      window.scrollTo(0, 0)
    });



  }

  ngAfterViewInit() {
    const nav = document.getElementsByTagName('nav')[0];
    const navbarHeight = nav.clientHeight;
    this.paddingTop = `${navbarHeight}px`;

    this.textElement.nativeElement.textContent = this.texts[this.currentIndex];
    this.textElement.nativeElement.classList.add('fade-in');

    this.captionElement.nativeElement.textContent = this.captions[this.currentIndex];
    this.captionElement.nativeElement.classList.add('fade-in');

    this.cycleTexts();


  }

  cycleTexts() {
    setInterval(() => {
      this.fadeOutText(() => {
        this.currentIndex = (this.currentIndex + 1) % this.texts.length;
        this.textElement.nativeElement.textContent = this.texts[this.currentIndex];
        this.captionElement.nativeElement.textContent = this.captions[this.currentIndex];
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


  title = 'Duygu Aydil';

  imageAddress = "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJhbHxlbnwwfHwwfHx8MA%3D%3D";


  /*setHeightoffirstDiv() {
    document.addEventListener('DOMContentLoaded', function() {
      var navbar = document.querySelector('nav');
      var firstDiv = document.querySelector('main > div:first-child');

      var navbarHeight = navbar.offsetHeight;

      firstDiv.style.marginTop = navbarHeight + 'px';
    });

  };*/

}
