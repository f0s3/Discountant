import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isNavOpened = false;
  items = [
    {
      title: 'Log out',
      url: '/auth/logout',
      icon: './assets/logout.svg'
    }
  ];

  constructor() {}

  myMethod(event: Event) {
    this.isNavOpened = !this.isNavOpened;
  }

}
