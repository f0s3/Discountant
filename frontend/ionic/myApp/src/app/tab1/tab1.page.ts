import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  isNavOpened = false;
  items = [
    {
      title: 'Log out',
      url: '/auth/logout',
      icon: './assets/logout.svg'
    }
  ];

  slides: Array<{ code: string; name: string; }>;

  constructor(private codes: AppServiceService) { }

  myMethod(event: Event) {
    this.isNavOpened = !this.isNavOpened;
  }

  ngOnInit(): void {
    this.codes.codes.subscribe((value) => {
      this.slides = value;
    });
  }
}
