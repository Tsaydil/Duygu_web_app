import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  paddingTop: string;
  defaultPaddingTop: number = 20;

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
