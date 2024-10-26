import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponentOLD implements OnInit , AfterViewInit{
  paddingTop: string;
  defaultPaddingTop: number = 20;

  constructor(private renderer: Renderer2, private el: ElementRef, private cdRef: ChangeDetectorRef) {
    this.paddingTop = '0px';
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const nav = document.getElementsByTagName('nav')[0];
    const navbarHeight = nav.clientHeight;
    console.log(typeof navbarHeight);
    this.paddingTop = `${navbarHeight + this.defaultPaddingTop}px`;

    this.cdRef.detectChanges();

  }

}
