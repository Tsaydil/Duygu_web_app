import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { createPopper } from "@popperjs/core";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-navbar-dropdown',
  templateUrl: './navbar-dropdown.component.html',
  styleUrls: ['./navbar-dropdown.component.css'],
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          opacity: 1,
          transform: "scale(1, 1)"
        })
      ),
      state(
        "closed",
        style({
          opacity: 0,
          transform: "scale(0.95, 0.95)"
        })
      ),
      transition("open => closed", [animate("100ms ease-in")]),
      transition("closed => open", [animate("200ms ease-out")])
    ])
  ]
})
export class NavbarDropdownComponent implements OnInit {
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef | undefined;
  @ViewChild("popoverDropdownRef", { static: false }) popoverDropdownRef: ElementRef | undefined;

  /*@HostListener("document:click", ["$event"])
  clickout(event: { target: any; }) {
    if (!this.popoverDropdownRef?.nativeElement.contains(event.target)) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }*/

  ngOnInit() {}

  get openCloseTrigger() {
    return this.dropdownPopoverShow ? "open" : "closed";
  }

  toggleDropdown(event: { preventDefault: () => void; }) {
    //this.dropdownPopoverShow = !this.dropdownPopoverShow;
  }

  closeDropdown() {
    this.dropdownPopoverShow = false;
  }

  createPopper() {
    createPopper(
      this.btnDropdownRef?.nativeElement,
      this.popoverDropdownRef?.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }

}
