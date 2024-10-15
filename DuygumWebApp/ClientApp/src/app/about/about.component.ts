import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ReadTextFileService} from "../services/read-text-file.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit, OnInit{
  paddingTop: string;
  defaultPaddingTop: number = 20;
  mainContents: string[] = [];
  educationContents: string[] = [];
  trainingContents: string[] = [];
  researchContent: string[] = [];
  mobileActive: boolean = false;

  constructor(private readTextFileService: ReadTextFileService) {
    this.paddingTop = '0px';
  }

  ngOnInit() {
    this.readTextFileService.readFileContents('assets/texts/about/main.txt').then((data) => {
      this.mainContents = data.split('\n');
    });
    this.readTextFileService.readFileContents('assets/texts/about/educations.txt').then((data) => {
      this.educationContents = data.split('\n');
    });
    this.readTextFileService.readFileContents('assets/texts/about/trainings.txt').then((data) => {
      this.trainingContents = data.split('\n');
    });
    this.readTextFileService.readFileContents('assets/texts/about/researches.txt').then((data) => {
      this.researchContent = data.split('\n');
    });

    const width = window.innerWidth;
    this.mobileActive = width < 1024;
  }

  ngAfterViewInit() {
    const nav = document.getElementsByTagName('nav')[0];
    const navbarHeight = nav.clientHeight;
    console.log(typeof navbarHeight);
    this.paddingTop = `${navbarHeight + this.defaultPaddingTop}px`;

  }

}
