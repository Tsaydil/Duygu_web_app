import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ReadTextFileService} from "../services/read-text-file.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit, AfterViewInit {
  paddingTop: string;
  defaultPaddingTop: number = 20;
  no:number = 0;
  headers: string[] = [];
  contents: string = '';
  mobileActive: boolean = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef,
    private readTextFileService: ReadTextFileService,
    private route: ActivatedRoute
  ) {
    this.paddingTop = '0px';
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.no = params['no'];
    });

    this.readTextFileService.readFileContents('assets/texts/posts/full/content_' + this.no + '.txt').then((data) => {
      this.contents = data;
    });
    this.readTextFileService.readFileContents('assets/texts/posts/headers.txt').then((data) => {
      this.headers = data.split('\n');
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
