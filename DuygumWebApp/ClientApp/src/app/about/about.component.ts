import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit{
  paddingTop: string;
  defaultPaddingTop: number = 20;

  constructor() {
    this.paddingTop = '0px';
  }

  ngAfterViewInit() {
    const nav = document.getElementsByTagName('nav')[0];
    const navbarHeight = nav.clientHeight;
    console.log(typeof navbarHeight);
    this.paddingTop = `${navbarHeight + this.defaultPaddingTop}px`;

  }

}
