import {ChangeDetectorRef, Component, ElementRef, Renderer2} from '@angular/core';
import {ReadTextFileService} from "../services/read-text-file.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  paddingTop: string;
  defaultPaddingTop: number = 20;
  headers: string[] = [];
  contents: string[] = [];
  duygularContents: string = '';
  terapiContents: string = '';
  terapiAmacContents: string = '';
  terapiYararContents: string = '';
  mobileActive: boolean = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef,
    private readTextFileService: ReadTextFileService
  ) {
    this.paddingTop = '0px';
  }

  ngOnInit(): void {

    this.readTextFileService.readFileContents('assets/texts/posts/short/contents.txt').then((data) => {
      this.contents = data.split('\n');
    });
    this.readTextFileService.readFileContents('assets/texts/posts/headers.txt').then((data) => {
      this.headers = data.split('\n');
    });

    this.readTextFileService.readFileContents('assets/texts/posts/short/duygular.txt').then((data) => {
      this.duygularContents = data;
    });
    this.readTextFileService.readFileContents('assets/texts/posts/short/terapi.txt').then((data) => {
      this.terapiContents = data;
    });
    this.readTextFileService.readFileContents('assets/texts/posts/short/terapi_amac.txt').then((data) => {
      this.terapiAmacContents = data;
    });
    this.readTextFileService.readFileContents('assets/texts/posts/short/terapi_yarar.txt').then((data) => {
      this.terapiYararContents = data;
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

}
